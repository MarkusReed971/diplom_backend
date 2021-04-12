const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: String,
    description: String,
    address: String,
    phone: String,
    date_registration: Date,
    date_registration_in_app: Date,
    status: Boolean,
    user_id: Number,
    inn: String,
})

module.exports = model('Center', schema)
