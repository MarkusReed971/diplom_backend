const {Schema, model, ObjectId} = require('mongoose')

const schema = new Schema({
    user_id: {type: ObjectId, required: true},
    user_to: {type: ObjectId, required: true},
    last_message: Date,
    is_checked: Boolean,
    messages: [
        {
            text: String,
            date: Date,
            user_id: ObjectId
        }
    ],
})

module.exports = model('Dialog', schema)
