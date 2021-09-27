const { MessageEmbed } = require("discord.js")
const { fbEmbed } = require("../../utils/fbEmbed-utils")

module.exports = {
    name: 'kick',
    description: 'kicks the user',
    usage: '<member> [reason]',
    category: 'moderation',
    permissions: 'KICK_MEMBERS',
    async run (client, message, args) {
        //the member that the user is trying to kick
        const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(e => { const target = undefined })
        
        //if the target is not found
        if (!target || !args[0]) return message.channel.send('Please provide a valid user to kick')
        
        if (target.id === message.author.id) return message.channel.send('I am afraid that you cannot kick yourself..')

        if (target.id === client.user.id) return message.channel.send('You\'re gonna kick me? **I am unkickable...**')

        const reason = args.slice(1).join(' ') || 'No reason specified'

        const kickEmbed = fbEmbed('success', 'User Kicked!')
            .addField('Kicked User', `target.user.tag (${target.id})`)
            .addField('Reason', reason)
        
        const kickUserEmbed = fbEmbed('error', 'Kicked!', `You have been kicked from ${message.guild.name}!`)
            .addField('Reason', reason)
            .setColor(0xFFFF00)

        target.send({ embeds: [kickUserEmbed]}).catch(err => {
            console.log(err)
        })
        
        target.kick({ reason })
            .then(() => message.channel.send({ embeds: [kickEmbed] }))
    }
}