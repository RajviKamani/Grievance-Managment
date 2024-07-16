const sequelize = require('./dbConnect');
const { Complain } = require('../Models'); 
const path = require('path');

const addComplain = (req,res) =>{
    const {complain} = req.body;
    const doc = req.file ? req.file.filename : null;
    try{

        if(!complain){
            return res.json({ status: "error", message: "Add Complain Properly!" }); 
        }
        const newComplain =  Complain.create({complain,doc});

        return res.json({ status: "success", message: "Complain Added Successfully!" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Something went wrong, please try again later." });
    }
   
}
module.exports = addComplain;