const User = require('../models/user.model');
const config = require('../config');
module.exports = {
  async createUser(req,res){
    if(!req.body.user.role || config.roles.indexOf(req.body.user.role) == -1){
      return res.status(400).send( {error:'undefined role'} );
    }
    let newUser = new User({
      name: req.body.user.name,
      lastname: req.body.user.lastname,
      username: req.body.user.username,
      password: req.body.user.password,
      role: req.body.user.role
    });
    try{
      await newUser.save();
      return res.status(201).send(newUser);
    }catch(err){
      return res.status(400).send(err);
    }
  },
  async getAllUsers(req, res) {
    try{
      let users = await User.find();
      return res.status(200).send(users);
    }catch(err){
      return res.status(500).send(err);
    }
  },
  async getUser(req, res) {
    try{
      let user = await User.findOne({ username:req.params.username });
      if(!user){
        return res.sendStatus(404);
      }
      return res.status(200).send(user);
    }catch(err) {
      if(err.name == 'CastError'){
        return res.sendStatus(404);
      }else{
        res.status(500).send(err);
      }
    }
  }
};