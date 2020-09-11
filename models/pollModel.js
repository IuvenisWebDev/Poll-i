const {Schema, model} = require('mongoose');

const pollSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    isMultipleChoice: {
        type: Boolean,
        required: true
    },

    options: [{
        label: {
            type: String,
            required: true
        },

        count: Number
    }],

    expiration: {
        type: Date,
        required: true
    }

},{timestamps: true});

const Poll = model('Poll', pollSchema);

module.exports = Poll;