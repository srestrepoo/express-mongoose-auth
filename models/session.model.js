const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SessionSchema = new Schema({
    name: {type: String, required: true, unique: true},
    professor: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
});

// Export the model
module.exports = mongoose.model('Session', SessionSchema);