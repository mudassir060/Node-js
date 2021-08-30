const express = require('express');
const bd = require('body-parser');
const core = require('cors')
const app = express();
const mongoose = require('mongoose');
const brcypt = require('bcryptjs')
const port = 5000;

let authModel = require('./authschema')

app.use(core());
app.use(bd.urlencoded({
    extended: false
}))
app.use(bd.json());

mongoose.connect('mongodb+srv://admin:090078601@cluster0.akijc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
    console.log("Database Connected")
})

mongoose.connection.on("error", () => {
    console.log("Database Not Connected")
})

app.get('/', (req, res) => {
    res.send('helo word to first API');
    // console.log("Pakistan");
})


app.post('/signup', async(req, res) => {
    // res.send('signin API');
    // console.log(req.body);

    var checkUser = await authModel.findOne({ email:req.body.email})
    // var checkUser = await authModel.deleteOne({ email:req.body.email})
    // res.send({result:checkUser});
    if (checkUser) {
        res.status(200).send({result:checkUser,message:'Email already Registered'});
    } else {
        // res.status(200).send({message:'yes you can Sign Up'});
        var haspass = await brcypt.hash(req.body.password,12)
        // res.send({pass:haspass})
        let userCreate = new authModel({
            email: req.body.email,
            password: haspass,
        })
        userCreate.save()
            .then((responce) => {
                res.status(200).send({result:responce,message:"User SignUp Successfully"})
                // console.log(responce, "responce success")
            }).catch((err) => {
                res.status(400).send({result:err.message,message:"Data Not Stored Successfully"})
                // console.log(err, "err")
            })
    }
})


app.post('/signin', async(req, res) => {
    var checkUser = await authModel.findOne({ email:req.body.email})
    if (checkUser) {
        // res.status(200).send({result:checkUser,message:'Login Successfully'});
        var checkPass = await brcypt.compare(req.body.password,checkUser.password)
        // res.send(checkPass) ///Pass true and false
        if (checkPass) {
            res.status(200).send({message:"Your are signin successfully"})
        } else {
           res.status(403).send({message:"Your Password is incorrect"})
        }
    } else {
        res.status(200).send({result:checkUser,message:'NOt User is registered with this Email'});
    }
})


app.post('/delete', async(req, res) => {
    var checkUser = await authModel.deleteOne({ email:req.body.email})
    if (checkUser.deletedCount==1) {
        res.status(200).send({result:checkUser,message:'Deleted Successfully'});

    } else {
        res.status(200).send({result:checkUser,message:'NOt Found'});
    }
})

app.listen(port, () => {
    console.log('server is runing....');
})