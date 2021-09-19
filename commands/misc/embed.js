const { MessageEmbed } = require("discord.js")
const { fbEmbed } = require("../../utils/fbEmbed-utils")

module.exports = {
    name: 'embed',
    description: 'Sends a custom embed',
    aliases: ['e', 'em'],
    usage: '<embed json>',
    category: 'misc',
    permissions: 'ADMINISTRATOR',
    run (client, message, args) {
        try {
            const said = JSON.parse(args.join(' '))
            const embed = new MessageEmbed(said)

            message.channel.send({ embeds: [embed] })
        } catch (err) {
            const errEmbed = fbEmbed('error', 'Invalid JSON!', 'Please use a valid json format!')
                .addField('Error', `\`\`\`\n${err.toString()}\n\`\`\``)

            message.channel.send({ embeds: [errEmbed] })
        }
    }
}
        