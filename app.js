const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/userModel');

const app = express();

mongoose.connect(`mongodb://localhost/voteApp`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) =>{
        console.log('Connected to database');
        app.listen(3000);
    }).catch((err) =>{
        console.log(err);
    })

app.use(morgan('dev'));

app.get('/', (req, res) =>{
    res.sendFile('./index.html',{root: __dirname});
});

app.post('/signIn', (req, res) =>{
    const user = new User(req.body);

    user.save().then((result) =>{
        console.log(result);
        res.redirect('/');
    }).catch((err) =>{
        console.log(err);
    });
});