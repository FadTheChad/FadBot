const { MessageEmbed } = require("discord.js")
const { fbEmbed } = require("../../utils/fbEmbed-utils")

module.exports = {
    name: 'ban',
    description: 'bans the user',
    aliases: ['yeet', 'eliminate', 'nobebis'],
    usage: '<member> [reason]',
    category: 'moderation',
    permissions: 'BAN_MEMBERS',
    async run (client, message, args) {
        //the member that the user is trying to ban
        const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(e => { const target = undefined })
        
        //if the target is not found
        if (!target || !args[0]) return message.channel.send('Please provide a valid user to ban')
        
        if (target.id === message.author.id) return message.channel.send('I am afraid that you cannot ban yourself..')

        if (target.id === client.user.id) return message.channel.send('You\'re gonna ban me? **I am unbannable...**')

        const reason = args.slice(1).join(' ') || 'No reason specified'

        const banEmbed = fbEmbed('success', 'User Banned!')
            .addField('Banned User', `target.user.tag (${target.id})`)
            .addField('Reason', reason)
            .setColor(0xFFFF00)
        
        const banUserEmbed =  new MessageEmbed()
            .setTitle('Banned!')
            .setDescription(`You have been banned from ${message.guild.name}!`)
            .addField('Reason', reason)
            .setColor(0xFFFF00)

        
        target.send({ embeds: [banUserEmbed]}).catch(err => {
            console.log(err)
        })
        
        target.ban({ reason })
            .then(() => message.channel.send({ embeds: [banEmbed] }))
    }
}
