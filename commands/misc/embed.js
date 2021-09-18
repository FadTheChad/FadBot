const { MessageEmbed } = require("discord.js")

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
            const errEmbed = new MessageEmbed()
                .setTitle('<:FadBot_Cross:887607566060888094> Invalid JSON!')
                .setDescription('Please use a valid json format!')
                .addField('Error', `\`\`\`\n${err.toString()}\n\`\`\``)
                .setColor(0x0000FF)

            message.channel.send({ embeds: [errEmbed] })
        }
    }
}
        