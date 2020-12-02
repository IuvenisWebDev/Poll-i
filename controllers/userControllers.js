const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const user = new User(req.body);

    if (await User.findOne({ email: user.email })) {
      res.status(409).send({error: "This e-mail is already in use."});
    } else {
      user.password = await bcrypt.hash(user.password, 12);

      user.save().then(async (result) => {
        await res.cookie("user_id", result._id, { httpOnly: true,maxAge:  86400000 }); // 1 day expiration
        res.redirect("/");
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res,next) => {
  try {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {

      res.status(409).send({error: "User not found."});

    } else if (!(await bcrypt.compare(req.body.password, user.password))) {

      res.status(401).send({error: "Invalid password."});

    } else {

      await res.cookie("user_id", user._id, { httpOnly: true, maxAge: 86400000});
      await res.cookie("user_name", user.name, { httpOnly: true, maxAge: 86400000});
      res.redirect("/");
    }
  } catch (err) {
    next(err);
  }
};

const signOut = async (req,res,next) =>{
  try{

    res.clearCookie("user_id");
    res.clearCookie("user_name");
    res.redirect("/");
  }catch (err){
    next(err);
  }
}

module.exports = {
  signUp,
  login,
  signOut,
};
