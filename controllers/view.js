const sequelize = require('./dbConnect');
const {Complain} = require('../Models');
const { where } = require('sequelize');
const { Op } = require('sequelize');

const view = async(req,res)=>{

    try{
    const complains = await Complain.findAll({
        attributes: ['id','complain','doc'],
        where:{
            deleteAt:{
                [Op.is]:null
            }
        }
    });

    res.render('../Views/view.ejs',{complains});

} catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch complains." });
}
}


const del = async(req,res)=>{
    const {id} = req.params;
    // const {status} = req.body;

    try{
        const [updatedRowsCount] = await Complain.update(
            { status: 'closed', deleteAt: new Date() },
            {where:{id:id,deleteAt:{ [Op.is]:null } }}
        );

        if (updatedRowsCount>0) {
            res.status(200).json({ status: 'success', message: 'Complaint status updated' });
        } else {
            res.status(404).json({ status: 'error', message: 'Complaint not found' });
        }

    } catch (error) {
        res.status(500).json({ status: "error", message: "Failed to Delete the Complain" });
    }
}

module.exports = {
    view,
    del
};