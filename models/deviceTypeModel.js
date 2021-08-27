const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    companies: [{
        title: String
    }]
})

module.exports = model('DeviceType', schema)
