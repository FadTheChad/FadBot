const Schema = require('../../schemas/Guild')

let prefixCache = {}

module.exports.setPrefix = (guildId, newPrefix) => {
    Schema.findOne({ _id: guildId}, async (err, data) => {
        if (data) {
            data.config.prefix = newPrefix

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    prefix: newPrefix
                }
            })

            data.save()
        }

        prefixCache[guildId] = newPrefix
    })
}

module.exports.getPrefix = async (guildId) => {
    const cachedPrefix = prefixCache[guildId]

    if (cachedPrefix) return cachedPrefix

    const result = await Schema.findOne({ _id: guildId })

    prefixCache[guildId] = result?.config.prefix

    return result?.config.prefix
}