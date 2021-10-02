const Schema = require("../../schemas/Guild");

module.exports.setLeave = (guildId, channelId, text) => {
    Schema.findOne({ _id: guildId }, async (err, data) => {
        if (err) throw err

        if (data) {
            data.config.leaveChannel._id = channelId
            if (text) data.config.leaveChannel.text = text

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    leaveChannel: {
                        _id: channelId
                    }
                }
            })

            if (text) data.config.leaveChannel.text = text

            data.save()
        }
    })
}