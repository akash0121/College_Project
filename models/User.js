const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true,
    },
})

module.exports = User = mongoose.model("User", UserSchema)