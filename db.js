const mongoose = require('mongoose');
require('dotenv').config();

// const mongoLink = process.env.Database;

const mongoURI = process.env.database;

const connectToMongo = ()=>{

    mongoose.connect(mongoURI, ()=>{
        console.log("mongoose connected");
    })

}

module.exports = connectToMongo;