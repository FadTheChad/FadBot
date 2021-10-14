const GuildSchema = require('../schemas/Guild')
const { fbEmbed } = require('../utils/fbEmbed-utils')

module.exports = {
    name: 'guildMemberAdd',
    run (member, client) {
        GuildSchema.findOne({ _id: member.guild.id }, async (err, data) => {
            if (err) throw err

            if (!data || !data.config.welcomeChannel?.id) return

            const wChannel = member.guild.channels.cache.get(data.config.welcomeChannel.id)
            const wMessage = data.config.welcomeChannel.text

            const wEmbed = fbEmbed('success', 'New Member!', wMessage.replace(/{member}/g, member.user.tag).replace(/{memberId}/g, member.id).replace(/{server}/, member.guild.name))
                .setThumbnail(member.user.avatarURL({dynamic: true}))
                .setFooter(member.id)
                .setTimestamp()
            
            wChannel.send({ embeds: [wEmbed] })
        })
    }
}