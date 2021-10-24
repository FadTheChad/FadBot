import fbEmbed from '../../utils/fbEmbed-utils'
import { getMutedRole } from '../../utils/db/muted-role-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'unmute',
    description: 'Unmutes the specified member',
    aliases: ['um'],
    usage: '[member]',
    category: 'moderation',
    permissions: 'MANAGE_ROLES',
    async run (client, message, args) {
        const member = message.mentions.members!?.first() || await message.guild!.members.fetch(args[0]).catch(e => { const member = undefined })

        if (!member || !args[0]) {
            const errEmbed = fbEmbed('error', 'Member not found!', 'Please specify a valid member')

            return message.channel.send({ embeds: [errEmbed]})
        }

        const mutedRole = await getMutedRole(message.guild!.id)

        if (!mutedRole) return message.channel.send('No `muted` role found! Please create one!')

        if (!member.roles.cache.get(mutedRole)) {
            const errEmbed = fbEmbed('error', 'Member Not Muted!', 'This member is not muted!')

            return message.channel.send({ embeds: [errEmbed] })
        }

        member.roles.remove(mutedRole)
            .then(() => {
                const unmuteEmbed = fbEmbed('success', 'Member Successfully Unmuted!', `Member <@${member.id}> has been unmuted!`)
                const unmutedUserEmbed = fbEmbed('success', 'Unmuted!', `You have been unmuted from ${message.guild!.name}!`)

                message.channel.send({ embeds: [unmuteEmbed] })

                member.user.send({ embeds: [unmutedUserEmbed] }).catch(e => console.log('Cannot DM User'))
            })
            .catch(e => {
                return message.channel.send({ embeds: [fbEmbed('error', 'Unable to unmute user!', 'The bot is unable to unmute this user!')] })
            })
    }
}

export default command