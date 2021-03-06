import { Model, model, Schema } from 'mongoose'
import { prefix } from '../config.json'
import IGuild from '../structure/interfaces/db/IGuild'

const GuildSchema = new Schema({
    _id: { type: String },
    config: {
        prefix: { type: String, default: prefix },
        welcomeChannel: {
            id: { type: String },
            text: { type: String, default: '{member} has joined the server!' }
        },
        leaveChannel: {
            id: { type: String },
            text: { type: String, default: '{member} has left the server!' }
        },
        mutedRole: String,
        blacklistedWords: {
            type: [{
                word: String,
                level: Number
            }],
            default: []
        }
    }
})

const GuildModel: Model<IGuild> = model('guild-settings', GuildSchema)

export default GuildModel