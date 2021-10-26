import GuildSchema from '../schemas/Guild'
import fbEmbed from '../utils/fbEmbed-utils'
import IEvent from '../structure/interfaces/IEvent'
import { GuildMember, TextChannel } from 'discord.js'
import { Document } from 'mongoose'
import IGuild from '../structure/interfaces/db/IGuild'

const event: IEvent = {
    name: 'guildMemberRemove',
    run (client, member: GuildMember) {
        GuildSchema.findOne({ _id: member.guild.id }, async (err: Error, data: Document<any, any, IGuild> & IGuild) => {
            if (err) throw err

            if (!data || !data.config.leaveChannel?.id) return

            const lChannel = member.guild.channels.cache.get(data.config.leaveChannel.id) as TextChannel
            const lMessage = data.config.leaveChannel.text

            const lEmbed = fbEmbed('success', 'Member Left!', lMessage.replace(/{member}/g, member.user.tag).replace(/{memberId}/g, member.id).replace(/{server}/, member.guild.name))
                .setThumbnail(member.user.avatarURL({dynamic: true}) || member.user.defaultAvatarURL)
                .setFooter(member.id)
                .setTimestamp()

            lChannel!.send({ embeds: [lEmbed] })
        })
    }
}

export default event