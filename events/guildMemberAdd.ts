import GuildSchema from '../schemas/Guild'
import fbEmbed from '../utils/fbEmbed-utils'
import IEvent from '../structure/interfaces/IEvent'
import { GuildMember, TextChannel } from 'discord.js'
import { Document } from 'mongoose'
import IGuild from '../structure/interfaces/db/IGuild'

const event: IEvent = {
    name: 'guildMemberAdd',
    run (client, member: GuildMember) {
        GuildSchema.findOne({ _id: member.guild.id }, async (err: Error, data: Document<any, any, IGuild> & IGuild) => {
            if (err) throw err

            if (!data || !data.config.welcomeChannel?.id) return

            const wChannel = member.guild.channels.cache.get(data.config.welcomeChannel.id) as TextChannel
            const wMessage = data.config.welcomeChannel.text

            if (!wChannel) return

            const wEmbed = fbEmbed('success', 'New Member!', wMessage.replace(/{member}/g, member.user.tag).replace(/{memberId}/g, member.id).replace(/{server}/, member.guild.name))
                .setThumbnail(member.user.avatarURL({dynamic: true}) || member.user.defaultAvatarURL)
                .setFooter(member.id)
                .setTimestamp()


            wChannel.send({ embeds: [wEmbed] })
        })
    }
}

export default event