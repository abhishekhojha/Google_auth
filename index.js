const express = require("express")
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const cors = require("cors")
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("server is runnig on port 8000")
})