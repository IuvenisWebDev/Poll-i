const Poll = require('../models/pollModel');
const User = require('../models/userModel');

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

            option = JSON.parse(option);
            option.count = 0;
            return option;

        })


        const expiration = new Date(req.body.expiration);

        const poll = new Poll({
            title: req.body.title,
            description: req.body.description,
            isMultipleChoice: req.body.isMultipleChoice,
            options,
            expiration
        });

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

const vote = async (req, res) => {

    try{

        const poll = await Poll.findById(req.body.pollId);
        const user = await User.findById(req.body.userId);

        const votes = req.body.votes.split(",");

        const alreadyVoted = user.votes.filter(vote =>{

            return poll._id.toString() === vote.poll.toString();

        })


        if(alreadyVoted.length > 0){
            
            res.status(409).send("You've already voted.");

        }else if( (!poll.isMultipleChoice) && votes.length > 1){
            
            res.status(406).send("Only one option allowed.");

        }else if(Number(poll.expiration ) < Date.now()){

            res.status(409).send("Expired poll.");

        }else{

            await votes.forEach(vote => {
                    user.votes.push({
                    poll: poll._id,
                    vote: vote
                });
            });

            await user.save();

            await poll.options.forEach( option =>{

                if(votes.includes(option._id.toString())){

                    option.count += 1;

                }

            })

            await poll.save()
                .then((result) =>{
                    res.send(result);
                })

        }

    }catch (err){

        console.log(err);

    }

};


module.exports = {
    get_polls,
    get_poll,
    create_poll,
    vote
};