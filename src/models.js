const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const registerSchema = new mongoose.Schema({
    firstname: String,
    surname: String,
    gender:String,
    college: String,
    course:String,
    year:String,
    address: String,
    email: String,
    phone: Number,
    password: String,
    idCard: String,

    tokens: [{
        token: {
            type: String,
        }
    }]
})
registerSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, "mynameispradeepjatiamfrommaharajacollege")

        this.tokens = this.tokens.concat({ token: token })
        await this.save();

        return token;
    } catch (error) {
        console.log('\n the error part' + error)
    }
}

const account = mongoose.model('account', registerSchema);

module.exports = account;