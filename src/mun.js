const mongoose = require('mongoose');

const munSchema = new mongoose.Schema({
    email:String,
    name:String,
    phone:Number,
    portfolio1:String,
    portfolio2:String,
    PreviousExperiences:String,
	 college:String
})

const Mun = mongoose.model('Mun',munSchema);

module.exports = Mun;
