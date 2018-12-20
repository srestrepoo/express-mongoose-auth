const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const routes = require('./routes');

//Database conection
let db_url = 'mongodb://admin:password1@ds235785.mlab.com:35785/express-tutorial1';
const mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Data Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", routes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

