const { model, Schema } = require('mongoose')
const { prefix } = require('../config.json')

const GuildSchema = new Schema({
    _id: { type: String },
    config: {
        prefix: { type: String, default: prefix },
        welcomeChannel: {
            _id: { type: String },
            text: { type: String, default: '{member} has joined the server!' }
        },
        leaveChannel: {
            _id: {type: String},
            text: {type: String, default: '{member} has left the server!'}
        },
        mutedRole: String
    }
})

module.exports = model('guild-settings', GuildSchema)