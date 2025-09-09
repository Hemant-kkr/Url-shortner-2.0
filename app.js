const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require("connect-mongo");

const path = require('path')
const cors = require('cors');
const PORT = 5005;
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//mongodb configuration function
const connectDB = require('./config/db');
connectDB();

//ejs setup
app.set("view engine", 'ejs');
app.set("views", __dirname+ '/views');


//routes
const pageRoutes = require('./routes/pageRoutes')
const urlRouter = require('./routes/url');
const authRoutes= require('./routes/auth');
const redirectRoute= require('./routes/redirect')
const  deleteUrl = require('./routes/deleteUrl')


//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



// session setup
app.use(session({
    secret: process.env.SESSION_SECRET|| 'nothing ',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: { maxAge: 1000*60*60 }
})
);

//handling the incoming requests via routes 
app.use('/',pageRoutes);
app.use('/url', urlRouter); // Handling the request for shortening the url
app.use('/auth',authRoutes);//handling the incoming  authentication requests 
app.use('/rq',redirectRoute);
app.use('/delete',deleteUrl);





app.listen(PORT, () => {
    console.log(`Server is started at localhost http://localhost:${PORT}`);
})