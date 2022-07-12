const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_TOKEN = process.env.JWT_TOKEN;

// Middleware is a funtion which is used to validate the token 
// i.e. verify and ensure that the correct user is logged in and his/her data will only be sent not of some other person 

const fetchuser = (req, res, next)=>{
     
    // get user from the JWT token and add it to the req object 
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"please Authenticate using a valid token"})
    }

    // Try catch are used for proper function and debugging of out app.
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data.user;
        next();                 // Here next() will call the async funtion present inside the getuser post request after fetchuser.
    } catch (error) {
        return res.status(401).send({error:"please Authenticate using a valid token"})

    }
}

module.exports = fetchuser;