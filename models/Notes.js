const mongoose = require("mongoose");
const {Schema} = mongoose;

const NotesSchema = new Schema({
    // 'user' will contain the userId(ObjectId) of the user who is adding or fetching notes
    // This takes two inputs which are predefined by the documentation to perform these types of action
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);