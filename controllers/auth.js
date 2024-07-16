const register = require('./register');
const express = require('express');
const app = express();
const router = express.Router();
const login = require('./login');
const addComplain = require('./addComplain')
const {view,del} = require('./view');
const {admin,superAdmin} = require('./roleMiddleware')
const loggedin = require('./loggedin')
const multer = require('multer');
const path = require('path');

// for documents
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/documents')
    },
    filename:function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const uploads = multer({storage:storage})


// for profile
const storage_profile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profile/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload_profile = multer({ storage: storage_profile });    



router.post('/register',upload_profile.single('image'),register);
router.post('/login',login);
router.post('/add',loggedin,admin,uploads.single('doc'),addComplain);
router.put('/delete/:id',loggedin,superAdmin,del);


module.exports = router;

