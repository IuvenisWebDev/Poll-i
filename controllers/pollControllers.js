const Poll = require('../models/pollModel');
const User = require('../models/userModel');

const get_poll = async (req, res,next) =>{

    try{

        let pollIds;
        let polls;
        
        if(req.params.type){

            
            const user = await User.findById(req.cookies['user_id']);

            if(req.params.type === "polls"){

                polls = await Poll.find({'_id': {$in : user.polls}})

            }else if(req.params.type === "votes"){

                pollIds = user.votes.map(vote =>{
                    return vote.poll;
                })

                polls = await Poll.find({'_id': {$in : pollIds}});

            }else{

                res.status(404).send({error: "Invalid url."});

            }



        }else if(req.params.id){

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

        next(err._message)

    }
    
};

const create_poll = async (req, res) =>{

    try{

        const user = await User.findById(req.cookies["user_id"]);

        /* const options = req.body.options.split(",").map( option => {

            option = JSON.parse(option);
            option.count = 0;
            return option;

        }) */



        const expiration = new Date(req.body.expiration);

        const poll = new Poll({
            title: req.body.title,
            description: req.body.description,
            isMultipleChoice: req.body.isMultipleChoice,
            options: req.body.options,
            expiration
        });

        await poll.save()
            
        await user.polls.push(result._id);
        await user.save();

        res.send(result);

    }catch (err){
        res.status(400).send({error:err._message});
    }
};

const vote = async (req, res,next) => {

    try{

        const poll = await Poll.findById(req.params.id);
        const user = await User.findById(req.cookies["user_id"]);

        const votes = req.body.votes;

        const alreadyVoted = user.votes.filter(vote =>{

            return poll._id.toString() === vote.poll.toString();

        })


        if(alreadyVoted.length){
            
            res.status(409).send({error: "You've already casted a vote on this poll."});

        }else if( (!poll.isMultipleChoice) && votes.length > 1){
            
            res.status(406).send({error: "This is a single choice poll."});

        }else if(Number(poll.expiration ) < Date.now()){

            res.status(409).send({error: "This poll is expired."});

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

        next(err)

    }

};


module.exports = {
    get_poll,
    create_poll,
    vote
};
