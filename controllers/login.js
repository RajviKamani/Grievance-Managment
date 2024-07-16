const sequelize = require('./dbConnect');
const bcrypt = require('bcryptjs');
const { User } = require('../Models'); 
const dotenv = require('dotenv'); 
const jwt = require('jsonwebtoken'); 

dotenv.config();

const login = async(req,res)=>{
    const {email,password} = req.body
    
    try{
    if (!email || !password) return res.json({ status: "error", error: "Please Enter Valid Credentials!" });
    
    const userWithMail = await User.findOne({where:{email}});

    if (!userWithMail) {
        return res.status(404).json({ status: "error", error: "Email or password does not match!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, userWithMail.password);

     if (!isPasswordMatch) {
            return res.status(401).json({ status: "error", error: "Password is incorrect!" });
        }


    const jwtToken = jwt.sign({id: userWithMail.id , email:userWithMail.email},process.env.JWT_SECRET);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    res.cookie("userRegistered", jwtToken, cookieOptions);
    
    res.setHeader('X-Login-Success', 'true');
    return res.json({ status: "success", message: "User has been logged in successfully!" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ status: "error", error: "Something went wrong, please try again later." });
    }
};

module.exports = login