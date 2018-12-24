const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SessionSchema = new Schema({
    name: {type: String, required: true, unique: true},
    professor: {type: String, required: true},
});

// Export the model
module.exports = mongoose.model('Session', SessionSchema);