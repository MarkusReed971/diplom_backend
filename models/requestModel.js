const {Schema, model, ObjectId} = require('mongoose')

const schema = new Schema({
    description: {type: String, required: true},
    feedback: {type: String},
    feedback_type: {type: String},
    device: {type: String, required: true},
    center_id: {type: ObjectId, required: true},
    user_id: {type: ObjectId, required: true},
    worker_id: {type: ObjectId},
    date: {type: Date, required: true},
    status: {type: String, required: true},
})

module.exports = model('Request', schema)
