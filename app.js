const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const userControllers = require('./controllers/userControllers');
const pollControllers = require('./controllers/pollControllers');

const app = express();

mongoose.connect(`mongodb://localhost/voteApp`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) =>{
        console.log('Connected to database');
        app.listen(3000);
    }).catch((err) =>{
        console.log(err);
    })

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) =>{
    res.sendFile('./index.html',{root: __dirname});
});

app.post('/signIn', (req, res) =>{
    userControllers.signIn(req, res);
});

app.get('/login', (req, res) =>{
    userControllers.login(req, res);
});

app.get('/polls', (req, res) => {
    pollControllers.get_polls(req, res);
});

app.post('/polls/create', (req, res) =>{
    pollControllers.create_poll(req, res);
});

app.get('/polls/:id', (req, res) => {
    pollControllers.get_poll(req, res, req.params.id);
});