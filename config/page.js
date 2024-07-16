const express = require("express");
const loggedin = require("../controllers/loggedin");
const router = express.Router();
const app = express();
const ejs = require('ejs');
const logout = require('../controllers/logout');
const {view,del} = require('../controllers/view');
const { admin,superAdmin } = require("../controllers/roleMiddleware");
const image = require('../controllers/image');

router.get('/',loggedin,(req,res)=>{
    if(req.user){
        res.render('index', {status:"loggedin" , user:req.user});
    }
    else{
        res.render('index',{status: "No" , user:"Nothing"});
    }
})

router.get('/register',(req,res)=>{
    res.sendFile("register.html", { root: './public/' })
});

router.get('/login',(req,res)=>{
    res.sendFile("login.html", { root: './public/' })
});

router.get('/add',loggedin,admin,(req,res)=>{
    res.sendFile("addComplain.html",{ root: './public/' })
});

router.get('/view',loggedin,superAdmin,view);

router.get('/profile',loggedin,superAdmin,(req,res)=>{
    res.render('profile',{user:req.user})
});

// router.get('/getusers',loggedin,superAdmin,(req,res)=>{
//     res.render('getusers')
// })

router.get('/logout', loggedin, logout);

module.exports = router;