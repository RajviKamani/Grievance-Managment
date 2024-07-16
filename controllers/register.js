const sequelize = require('./dbConnect');
const bcrypt = require('bcryptjs');
const { User } = require('../Models'); 
const path = require('path')


const register = async(req,res) =>{
    const {name,email,password:hashedPassword,role,address,skill} = req.body;
    // const image = req.file ? req.file.path : null;
    const image = req.file.filename;


    try{
    const alreadyExist =await User.findOne({where:{email}})
        
    if (alreadyExist) {
        return res.json({ status: "error", message: "User with this email already exists!" });
    }

    const password = await bcrypt.hash(hashedPassword, 10);
  
    const newUser = await User.create({
        name,email,password,role,address,skill,image:image
    })

    res.json({ status: "success", message: "User has been registered successfully!" });
    } catch (err) {
        res.json({ status: "error", message: "Something went wrong, please try again later." });
    }
    
}

module.exports = register;