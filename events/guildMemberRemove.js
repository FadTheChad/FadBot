const GuildSchema = require("../schemas/Guild");
const {fbEmbed} = require("../utils/fbEmbed-utils");
module.exports = {
    name: 'guildMemberRemove',
    run (member, client) {
        GuildSchema.findOne({ _id: member.guild.id }, async (err, data) => {
            if (err) throw err

            if (!data || !data.config.leaveChannel?.id) return

            const lChannel = member.guild.channels.cache.get(data.config.leaveChannel.id)
            const lMessage = data.config.leaveChannel.text

            const lEmbed = fbEmbed('success', 'Member Left!', lMessage.replace(/{member}/g, member.user.tag).replace(/{memberId}/g, member.id).replace(/{server}/, member.guild.name))
                .setThumbnail(member.user.avatarURL({dynamic: true}))
                .setFooter(member.id)
                .setTimestamp()

            lChannel.send({ embeds: [lEmbed] })
        })
    }
}