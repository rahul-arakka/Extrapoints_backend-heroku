const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')
const app = express();
const path = require("path");
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Connect/Express Middleware used to enable cors.
app.use(cors());

// Middleware used to use req.body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes are as following
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));


__dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}else{
    app.get('/', (req,res)=>{
        console.log('/ Page working')
        res.send("here working fine on /");
      }) 
}

app.listen(PORT,()=>{
    console.log(`Server started at port : ${PORT}`);
});
connectToMongo();
