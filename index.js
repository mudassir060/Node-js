const express = require('express');
const bd = require('body-parser');
const core = require('cors')
const app = express();
const mongoose = require('mongoose');
const mainRoute = require('./route/mainRoute')
const port = 5000;

app.use(core());
app.use(bd.urlencoded({
    extended: false
}))
app.use(bd.json());
app.use(mainRoute)
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




app.listen(port, () => {
    console.log('server is runing....');
})