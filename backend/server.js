var express = require('express');
var path = require('path');
var bodyParser =require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected',()=> {
    console.log('Database is connected' + config.database);
})

mongoose.connection.on('error',(err)=>{
    console.error('Database error', + err); 
})

var app = express();

var users = require('./routes/users');

var port = 3000;
//var port=process.env.PORT || 8080;

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(passport.session());

app.get('/',(req,res)=>{
    res.send('Invaild Endpoint');
})

app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(port,()=> {
    console.log('Server started on port ' + port);
})
