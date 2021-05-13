// Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Cors config
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: whitelist,
    credentials: true,
    optionSuccessStatus: 200,
    methods: 'GET, HEAD, POST, PUT'
}


const PORT = process.env.PORT || 8080;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/emeraldmarine', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./controllers/userController');
app.use(userRoutes)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});