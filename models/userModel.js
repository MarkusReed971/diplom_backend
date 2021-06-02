const {Schema, model, ObjectId} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    fullname: {type: String, required: true},
    age: Number,
    phone: {type: String, unique: true, required: true},
    mail: {type: String, unique: true},
    address: String,
    telegram: String,
    imageUrl: String,
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    center_id: {type: ObjectId},
    type: [{type: String}],
})

module.exports = model('User', schema)
