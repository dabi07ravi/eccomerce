const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const url = process.env.CONNECTION_URL;


const dbConnection = () => {
    mongoose.connect(url,mongoose.connect(url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }).then(() => console.log("Database is connected")).catch((err) => console.log("Error connecting to the database!!!!")) );
}

module.exports = dbConnection