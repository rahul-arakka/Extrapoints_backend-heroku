const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({

    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        unique: true,                       // Unique means this field value will not be duplicate
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
});

// Below two line are added so that no duplicate values will be added, this can be done using mongodb find functions also.
// const User = mongoose.model('user', UserSchema);
// User.createIndexes();
module.exports = mongoose.model('user', UserSchema);