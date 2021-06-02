const {Schema, model, ObjectId} = require('mongoose')

const schema = new Schema({
    user_id: {type: ObjectId, required: true},
    center_id: {type: ObjectId, required: true},
    type: {type: String, required: true},
})

module.exports = model('Worker', schema)
