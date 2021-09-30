const { setWelcome } = require("../../utils/db/welcome-channel-utils")
const { fbEmbed } = require("../../utils/fbEmbed-utils")

module.exports = {
    name: 'welcomechannel',
    description: 'Sets the welcome channel and message for the server.',
    aliases: ['welcome', 'welcomech', 'wc'],
    usage: '<welcome channel> [text]\nIn text you can use\n\n{member} - Joined member\n{memberId} - Joined member\'s ID\n{server} - Server name',
    category: 'utility',
    permissions: 'MANAGE_CHANNELS',
    run (client, message, args) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])

        if (!channel) {
            const errEmbed = fbEmbed('error', 'Welcome Channel Not Specified', 'Please specify a welcome channel!')

            return message.channel.send({ embeds: [errEmbed] })
        }

        let text = args.slice(1).join(' ')

        setWelcome(message.guild.id, channel.id, text)

        message.channel.send(`Works! maybe.`)
    }
}