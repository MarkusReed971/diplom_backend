const {Schema, model, ObjectId} = require('mongoose')

const schema = new Schema({
    description: {type: String, required: true},
    feedbackType: {type: String},
    device: {type: String, required: true},
    centerId: {type: ObjectId, required: true},
    userId: {type: ObjectId, required: true},
    masterId: {type: ObjectId},
    adminId: ObjectId,
    date: {type: Date, required: true},
    status: {type: Number, required: true},
    images: [String],
    fullname: String,
    meetingDate: Date,
})

module.exports = model('Request', schema)
