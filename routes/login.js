var express = require('express');
var router = express.Router();
const Passport = require('passport');

router.get('/login',(req, res)=>{
    res.render('login');
});

router.get('/logout', (req, res)=>{
    res.send('logout');
});

router.get('/google', Passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect', Passport.authenticate('google'), (req, res)=>{
    console.log('you reached the call back URI');
    // res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;