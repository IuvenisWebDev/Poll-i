const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const signIn = async (req, res) => {
    try{

        const user = new User(req.body);

        if(await User.findOne({email: user.email})){

            res.status(409).end();

        }else{
            user.password = await bcrypt.hash(user.password,12);

            user.save().then((result) => {
                // res.send(result)
                res.redirect('/');
            })
        }

    }catch (err){

        console.log(err);

    }
      
};

const login = async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email})

        if(!user){

            res.status(409).end();

        }else if(! await bcrypt.compare(req.body.password, user.password)){

            res.status(401).end();

        }else{

            //res.send({user});
            res.redirect('/');

        }
    }catch (err){

        console.log(err);
    }
    
};

module.exports = {
    signIn,
    login
};