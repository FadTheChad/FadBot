const Schema = require('../../schemas/Guild')

module.exports.setMutedRole = (guildId, mutedRole) => {
    Schema.findOne({ _id: guildId }, async (err, data) => {
        if (err) throw err

        if (data) {
            data.config.mutedRole = mutedRole

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    mutedRole
                }
            })

            data.save()
        }
    })
}

module.exports.getMutedRole = async (guildId) => {
    const result = await Schema.findOne({ _id: guildId })

    return result?.config.mutedRole
}
