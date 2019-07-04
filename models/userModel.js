let mongoose = require('mongoose');
let schema = mongoose.Schema;
let UserSchema = schema({

    userName : {
        type:String,
        required:true
    },
    googleId : {
        type:String,
        required:true
    }
   
});

let User = module.exports = mongoose.model('User', UserSchema);