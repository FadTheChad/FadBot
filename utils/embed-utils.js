const { MessageEmbed } = require('discord.js')

/**
 * @param {MessageEmbed} embed - The Embed
 * @returns {string|null}
 */
module.exports = embed => {
    let totalLength = embed.title?.length + embed.description?.length + embed.footer?.text?.length + embed.author?.name?.length

    if (embed.title?.length > 256) return 'Embed title cannot be more than 256 characters'

    if (embed.description?.length > 4096) return 'Embed description cannot be more than 4096 characters'

    if (embed.fields?.length > 25) return 'Embed fields cannot be more than 25'

    for (field of embed.fields) {
        if (field.name?.length > 256) return 'Embed field name cannot be more than 256 characters'
        totalLength += field.name?.length

        if (field.description?.length > 1024) return 'Embed field description cannot be more than 1024 characters'
        totalLength += field.description?.length
    }

    if (embed.footer?.text?.length > 2048) return 'Embed footer cannot be more than 2048 characters'

    if (embed.author?.name?.length > 256) return 'Embed author cannot be more than 256 characters'

    if (totalLength > 6000) return 'Total Limit Exceeded'

    return null
}