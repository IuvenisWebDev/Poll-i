const {Schema, model} = require('mongoose');
const Poll = require('./pollModel');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    polls: [{
        type: Schema.ObjectId,
        rel: Poll
    }],

    votes: [{
        poll:{
            type: Schema.ObjectId,
            rel: Poll
        },
        vote: [Schema.ObjectId]
    }],

    invitations: [{
        type: Schema.ObjectId,
        rel: Poll
    }]
});

const User = model('User', userSchema)

module.exports = User;