const jwt = require('jsonwebtoken');

const generateToken = function(data){
    return jwt.sign(data, process.env.JWT_KEY); 
}

module.exports = generateToken;