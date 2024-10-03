const express = require("express")
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const cors = require("cors")
const AuthRoute = require("./routes/AuthRoute")
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use("/",AuthRoute)
app.get("/",(req,res)=>{
    res.send("dont access this")
})
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch(err => console.log(err));
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("server is runnig on port 8000")
})