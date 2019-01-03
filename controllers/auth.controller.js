const User = require('../models/user.model');
const config = require('../config');
const jwt = require('jsonwebtoken');

async function auth(req, res){
  try{
    let user = await User.findOne({ username:req.body.auth.username });
    if(!user){
      return res.sendStatus(404);
    }else if(user.password != req.body.auth.password){
      return res.sendStatus(401);
    }else{
      const payload = {
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        role: user.role
      };
      let token = await jwt.sign(payload, config.key);
      return res.status(200).send({token:token});
    }
  }catch(err){
    return res.status(500).send(err);
  }
}
module.exports = auth;
