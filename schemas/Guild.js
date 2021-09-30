const { model, Schema } = require('mongoose')

const GuildSchema = new Schema({
    _id: { type: String },
    config: {
        welcomeChannel: {
            _id: { type: String },
            text: { type: String, default: '{member} has joined the server!' }
        } // will add more to this
    }
})

module.exports = model('guild-settings', GuildSchema)