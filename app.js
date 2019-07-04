var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Login = require('./routes/login');
var config = require('./config/keys');
const cookieSession = require('cookie-session');
var passport = require('passport');
const PassportSetup = require('./config/passport-setup');
const userProfile = require('./routes/profile-check');

var app = express();


app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[config.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',Login);
app.use('/profile',userProfile);

app.get('/',(req, res)=>{
    res.render('home');
});

app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('server started at port 3000');
    }
});

//databse connectivity
mongoose.connect(config.database);
mongoose.connection.on("connected", function (err) {
    if (err) {
        console.log("error in database connectivity" + err);
    } else {
        console.log('connected to database at port 27017');
    }
});
