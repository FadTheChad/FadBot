const { fbEmbed } = require("../../utils/fbEmbed-utils")
const { getStatusEmoji } = require("../../utils/userinfo-utils")

module.exports = {
    name: 'userinfo',
    description: 'Shows info of the specified user or of the message author.',
    aliases: ['ui', 'whoami'],
    usage: '[member]',
    category: 'info',
    async run (client, message, args) {
        let member = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(e => { let member })

        if (!member || !args[0]) member = message.member || await message.guild.members.fetch(message.author.id)

        const activity = member.presence?.activities[1]

        console.log(member.presence)

        const embed = fbEmbed('success', 'User Info!')
            .addField('Name', member.user.username)
            .addField('ID', member.id)
            .addField('isBot', `${member.user.bot}`)
            .addField('Status', `${getStatusEmoji(member)} | ${member.presence?.status || 'Offline'}`)
            .addField('Activity', activity ? activity.type + ' ' + activity.name : 'None')
            .addField('Created At', new Date(member.user.createdTimestamp).toUTCString())
            .addField('Joined At', new Date(member.joinedTimestamp).toUTCString())

        message.channel.send({ embeds: [embed] })
    }
}