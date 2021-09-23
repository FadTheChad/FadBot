const { fbEmbed } = require("../../utils/fbEmbed-utils")

module.exports = {
    name: 'serverinfo',
    description: 'Sends info of the current guild.',
    aliases: ['si', 'guildinfo', 'gi'],
    category: 'info',
    async run (client, message, args) {
        const botMembers = await message.guild.members.fetch().then(totalMembers => totalMembers.filter(m => m.user.bot))
        const userMembers = await message.guild.members.fetch().then(totalMembers => totalMembers.filter(m => !m.user.bot))
        
        const textChannels = message.guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT')
        const categoryChannels = message.guild.channels.cache.filter(ch => ch.type === 'GUILD_CATEGORY')
        const voiceChannels = message.guild.channels.cache.filter(ch => ch.type === 'GUILD_VOICE')

        const emojis = message.guild.emojis.cache.size
        const roles = message.guild.roles.cache.size

        const embed = fbEmbed('success', 'Server Info')
            .addField('Server Name', message.guild.name, true)
            .addField('Server ID', message.guild.id, true)
            .addField(
                'Member Count', 
                `Total: ${botMembers.size + userMembers.size}\nUsers: ${userMembers.size}\nBots: ${botMembers.size}`
            )
            .addField(
                'Channel Count', 
                `Text Channels: ${textChannels.size}\nCategory Channels: ${categoryChannels.size}\nVoice Channels: ${voiceChannels.size}`, true
            )
            .addField('Emojis', emojis.toString())
            .addField('Roles', roles.toString())

        message.channel.send({ embeds: [embed] })
    }
}