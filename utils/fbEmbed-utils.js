const { MessageEmbed } = require("discord.js")

module.exports = {
    fbEmbed: (type, title, description) => {
        const embed = new MessageEmbed()

        let emoji = ''
        let color = 0xFFFFFF

        if (type === 'success') {
            emoji = '<:FadBot_Tick:887599870024761434>'
            color = 0xFFFF00
        } else if (type == 'error') {
            emoji = '<:FadBot_Cross:887607566060888094>'
            color = 0x0000FF
        }

        embed.setTitle(`${emoji} ${title}`)
        if (description) embed.setDescription(description)
        embed.setColor(color)

        return embed
    }
}