const router = require('express').Router();
const authCheck = (req, res, next)=>{
    if(!req.user){
        //if the user is not loggedin
        res.redirect('auth/login');
    }else{
        //If the user is loggedin
        next();
    }
};

router.get('/', authCheck, (req, res)=>{
    res.send('You are logged in, this is your profile : '+req.user.userName);
});

module.exports = router;