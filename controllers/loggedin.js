const sequelize = require('./dbConnect');
const jwt = require('jsonwebtoken');
const {User} = require('../Models')

const loggedin = async(req,res,next)=>{
    if (!req.cookies.userRegistered) return next();
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        const user = await User.findOne({where:{id:decoded.id}})
           if(!user) return next();
        
            req.user = user;
            return next();  

    } catch (error) {
       return next()
    }
}


module.exports = loggedin;