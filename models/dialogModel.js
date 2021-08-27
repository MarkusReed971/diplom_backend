const {Schema, model, ObjectId} = require('mongoose')

const schema = new Schema({
    userId: {type: ObjectId, required: true},
    userTo: {type: ObjectId, required: true},
    lastMessage: Date,
    isChecked: Boolean,
    messages: [
        {
            text: String,
            date: Date,
            user_id: ObjectId
        }
    ],
})

module.exports = model('Dialog', schema)
