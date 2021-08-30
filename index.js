const express = require('express');
const bd = require('body-parser');
const core = require('cors')
const app = express();
const mongoose = require('mongoose');
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


app.post('/signin', (req, res) => {
    // res.send('signin API');
    // console.log(req.body);
    let userCreate = new authModel({
        email: req.body.email,
        password: req.body.password,
    })
    userCreate.save()
        .then((responce) => {
            res.status(200).send({result:responce,message:"Data Stored Successfully"})
            // console.log(responce, "responce success")
        }).catch((err) => {
            res.status(400).send({result:err.message,message:"Data Not Stored Successfully"})
            // console.log(err, "err")
        })
})

app.listen(port, () => {
    console.log('server is runing....');
})