const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    _id: { type: String },
    blacklisted: { type: Boolean, default: false }
})

module.exports = model('user-settings', UserSchema)