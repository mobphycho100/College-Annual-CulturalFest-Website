const mongoose = require('mongoose')

const groupeventSchema = new mongoose.Schema({
    email:String,
    name:String,
    phone:Number,
    groupevent:String,
    teamname:String,
    teammates:String,
	 college:String
})

const groupModel = new mongoose.model('groupEvent', groupeventSchema);

module.exports = groupModel;
