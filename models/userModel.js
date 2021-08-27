const {Schema, model, ObjectId} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    fullname: {type: String, required: true},
    age: Number,
    phone: {type: String, unique: true, required: true},
    mail: {type: String, unique: true},
    address: {
        city: String,
        district: String,
        street: String,
        house: String,
    },
    telegram: String,
    image: String,
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    centerId: {type: ObjectId},
    type: [{type: String}],
    favorites: [ObjectId],
    vacancy: [{
        centerId: ObjectId,
        role: String,
        date: Date,
    }]
})

module.exports = model('User', schema)
