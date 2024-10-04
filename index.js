const express = require("express")
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo");
const passport = require("passport")
const cors = require("cors")
const AuthRoute = require("./routes/AuthRoute")
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch(err => console.log(err));
// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        // maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' 
    }
}));
app.use(passport.initialize());
app.use(passport.session());


//Auth Route Start 
app.use("/", AuthRoute)
//Auth Route End



app.get("/", (req, res) => {
    res.send("dont access this")
})
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("server is runnig on port 8000")
})