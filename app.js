const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const routes = require('./routes');
const config = require('./config');

//Database conection
const mongoDB = process.env.MONGODB_URI || config.db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Data Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api", routes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

