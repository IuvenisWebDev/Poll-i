const Poll = require('../models/pollModel');
const User = require('../models/userModel');

const get_poll = async (req, res) =>{

    try{

        let pollIds;
        let polls;
        
        if(req.params.id){

            pollIds = req.params.id;


            polls = await Poll.findById(pollIds);
            

        }else if(req.body.pollIds){

            pollIds = req.body.pollIds.split(",");

            polls = await Poll.find({'_id': {$in : pollIds}});

        }else{

            polls = await Poll.find()
            
        }

        res.send(polls);

    }catch (err){

        console.log(err)

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

                res.send(result);

            }).catch((err) =>{

                console.log(err);

            })

    }catch (err){
        console.log(err);
    }
};

const vote = async (req, res) => {

    try{

        const poll = await Poll.findById(req.params.id);
        const user = await User.findById(req.body.userId);

        const votes = req.body.votes.split(",");

        const alreadyVoted = user.votes.filter(vote =>{

            return poll._id.toString() === vote.poll.toString();

        })


        if(alreadyVoted.length > 0){
            
            res.status(409).end();

        }else if( (!poll.isMultipleChoice) && votes.length > 1){
            
            res.status(406).end();

        }else if(Number(poll.expiration ) < Date.now()){

            res.status(409).end();

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

            poll.save()
                .then((result) =>{
    
                    res.send(result);

                })

        }

    }catch (err){

        console.log(err);

    }

};


module.exports = {
    get_poll,
    create_poll,
    vote
};