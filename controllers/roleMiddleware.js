
const admin = (req,res,next) =>{
    if(req.user && req.user.role === 'admin'){
        return next();
    }
    else{
        return res.status(403).json({ status: "error", message: "Access denied. Admins only." });
    }
}

const superAdmin = (req,res,next)=>{
    if (req.user && req.user.role === 'superAdmin') {
        return next();
    } else {
        return res.status(403).json({ status: "error", message: "Access denied. Superadmins only." });
    }
}

module.exports = {
    admin,
    superAdmin
}