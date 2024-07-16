const express = require('express');
const app = express();
require('./controllers/dbConnect')
const register = require('./controllers/register')
const bodyParser = require('body-parser')
const path = require('path');
const cookie = require('cookie-parser');


app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, 'Models')));


// app.get('/',(req,res)=>{
//     res.sendFile('register.html',{root:'./public'})
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookie());
app.use(express.json());

app.set("view engine",'ejs');
app.set('views',"./views");


app.use('/',require('./config/page'))
app.use('/api',require('./controllers/auth'))


app.use('/documents',express.static(path.join(__dirname, 'Views/documents')))

app.listen(5000,()=>{
    console.log('connected!')
});