const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyJWT(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    jwt.verify(token, config.key, function(err, decoded) {       
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       
      } else {
        req.decoded = decoded;         
        next();
      }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
}
module.exports = verifyJWT;

