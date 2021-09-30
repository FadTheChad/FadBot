const channel = require('../../commands/utility/channel')
const Schema = require('../../schemas/Guild')

module.exports.setWelcome = (guildId, channelId, text) => {
    Schema.findOne({ _id: guildId }, async (err, data) => {
        if (err) throw err

        if (data) {
            data.config.welcomeChannel._id = channelId
            if (text) data.config.welcomeChannel.text = text

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    welcomeChannel: {
                        _id: channelId
                    }
                }
            })

            if (text) data.config.welcomeChannel.text = text

            data.save()
        }
    })
}