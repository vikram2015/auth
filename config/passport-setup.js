const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

const user = require('../models/userModel');

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    user.findById(id).then((user)=>{
        done(null,user);
    })
})


passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/redirect',
        clientID:keys.google.clientID,
        clientSecret : keys.google.clientSecret
    },(accessToken, refreshToken, profile, done) => {

        user.findOne({googleId:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log('User is : '+currentUser);
                done(null, currentUser);
            }else{
                new user({
                    userName:profile.displayName,
                    googleId: profile.id
                }).save().then((newUserDetails)=>{
                    console.log('========= new user details ========= '+newUserDetails);
                    done(null, newUserDetails);
                })
            }
        })

        console.log('===========passport callback function fired ============ ');
        console.log('++++++++== profile details =++++++++ '+JSON.stringify(profile));
        
    })
)