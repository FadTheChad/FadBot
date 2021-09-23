const { MessageEmbed } = require("discord.js")

module.exports = {
    /** 
     * A custom MessageEmbed function for FadBot
     * @param {string} [type] - The type of embed (success | error)
     * @param {string} title - The embed's title
     * @param {string} [description] - The embed's description
     * @returns {object} - The MessageEmbed
    */
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