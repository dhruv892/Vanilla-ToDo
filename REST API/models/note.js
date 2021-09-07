const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    noteDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('note', noteSchema)