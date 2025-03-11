const mongoose = require('mongoose')

const soloeventSchema = new mongoose.Schema({
    email:String,
    name:String,
    phone:Number,
    soloevent:String,
	college:String
})

const soloModel = new mongoose.model('soloEvent', soloeventSchema);

module.exports = soloModel;
