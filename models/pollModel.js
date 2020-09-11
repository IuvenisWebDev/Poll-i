const {Schema, model} = require('mongoose');

const pollSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

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
    }]
});

const Poll = model('Poll', pollSchema);

module.exports = Poll;