const {Schema, model, ObjectId,} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    description: String,
    address: {
        city: String,
        district: String,
        street: String,
        house: String,
    },
    phone: {type: String, required: true},
    mail: {type: String},
    date: {type: Date, required: true},
    dateInApp: {type: Date, required: true},
    status: {type: Boolean, required: true},
    ownerId: {type: ObjectId, required: true},
    inn: {type: String, unique: true, required: true},
    schedule: [
        {
            day: {type: Number, required: true},
            startTime: {type: String},
            endTime: {type: String},
            isHoliday: Boolean,
        }
    ],
    images: [String],
    rating: Number,
    deviceTypes: [ObjectId],
    deviceCompanies: [ObjectId],
    reviews: [
        {
            userId: ObjectId,
            text: String,
            date: Date,
            rating: Number,
        }
    ]
})

module.exports = model('Center', schema)
