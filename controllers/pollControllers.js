const Poll = require('../models/pollModel');
const User = require('../models/userModel');
const { compareSync } = require('bcryptjs');

const get_polls = (req, res) =>{
    
    Poll.find()
        .then((polls) =>{

            //res.send(polls);
            res.redirect('/');

        })
        .catch((err) =>{

            console.log(err);

        })
};

const get_poll = async (req, res, id) =>{  
    try{

        const poll = await Poll.findById(id);

        if(!poll){

            res.status(404).end();

        }else{

            //res.send(poll);
            res.redirect('/')

        }

    }catch (err){

        console.log(err);

    }
    
        
};

const create_poll = async (req, res) =>{
    try{

        const user = await User.findById(req.body.userId);

        const options = req.body.options.split(",").map( option => {

            return JSON.parse(option);

        })


        req.body.expiration = new Date(req.body.expiration);
        req.body.options = options;

        const poll = new Poll(req.body);

        poll.save()
            .then( async (result) =>{

                await user.polls.push(result._id);
                await user.save();

                res.redirect('/polls');

            })


    }catch (err){
        console.log(err);
    }
};


module.exports = {
    get_polls,
    get_poll,
    create_poll
};