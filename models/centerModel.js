const {Schema, model, ObjectId} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    description: String,
    address: {type: String, required: true},
    phone: {type: String, unique: true, required: true},
    date_registration: {type: Date, required: true},
    date_registration_in_app: {type: Date, required: true},
    status: {type: Boolean, required: true},
    user_id: {type: ObjectId, required: true},
    inn: {type: String, unique: true, required: true},
    schedule: [
        {
            day: {type: String, required: true},
            start_time: {type: String, required: true},
            end_time: {type: String, required: true},
        }
    ],
    images: [
        {
            name: {type: String},
            url: {type: String},
        }
    ],
    services: [
        {
            name: {type: String},
            price: {type: Number},
        }
    ]
})

module.exports = model('Center', schema)
