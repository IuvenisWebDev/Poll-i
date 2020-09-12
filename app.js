const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRouter = require('./routers/userRouter');
const pollRouter = require('./routers/pollRouter')

const app = express();

mongoose.connect(`mongodb://localhost/voteApp`, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true})
    .then((result) =>{

        console.log('Connected to database');
        app.listen(3000);

    }).catch((err) =>{

        console.log(err);

    })

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))

app.use('/user', userRouter);

app.use('/poll', pollRouter);

app.get('/', (req, res) =>{
    res.sendFile('./index.html', {root: __dirname});
});