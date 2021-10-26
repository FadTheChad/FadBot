import { MessageEmbed } from "discord.js"
import ms from 'ms'
import fbEmbed from '../../utils/fbEmbed-utils'
import { getMutedRole } from '../../utils/db/muted-role-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'mute',
    description: 'Mutes the specified member',
    aliases: ['m'],
    usage: '<member> [time] [reason]',
    category: 'moderation',
    permissions: 'MANAGE_ROLES',
    async run (client, message, args) {
        //the member that the user is trying to mute
        const target = message.mentions.members!?.first() || await message.guild!.members.fetch(args[0]).catch(e => { const target = undefined })
        
        const mutedRole = await getMutedRole(message.guild!.id, client)

        //if the target is not found
        if (!target || !args[0]) return message.channel.send('Please provide a valid user to mute')

        if (target.id === message.author.id) return message.channel.send('I am afraid that you cannot mute yourself..')

        if (target.id === client.user!.id) return message.channel.send('You\'re gonna ban me? **I am unmutable...**')

        if (!message.member) await message.guild!.members.fetch(message.author.id)

        if (target.roles.highest.id === message.member!.roles.highest.id || target.roles.highest.id === message.guild!.me!.roles.highest.id) return message.channel.send('The member you are trying to mute has the same role as you/me!')

        if (!mutedRole) return message.channel.send('No `muted` role found! Please create one!')

        if (!!target.roles.cache.get(mutedRole)) return message.channel.send('This user is already muted!')

        let time = args[1] ? ms(parseInt(args[1])) : null

        let reason = (!time || isNaN(parseInt(time)) ? args.slice(1).join(' ') : args.slice(2).join(' ')) || 'No Reason Specified'

        const muteEmbed = fbEmbed('success', 'User Muted!')
            .addField('Muted User', `${target.user.tag} (${target.id})`)
            .addField('Reason', reason)
            .setColor(0xFFFF00)
        
        const muteUserEmbed =  new MessageEmbed()
            .setTitle('Muted!')
            .setDescription(`You have been muted from ${message.guild!.name}!`)
            .addField('Reason', reason)
            .setColor(0xFFFF00)

        if (!!time && !isNaN(parseInt(time))) {
            muteEmbed.addField('Duration', `${ms(parseInt(time))}`)
            muteUserEmbed.addField('Duration', `${ms(parseInt(time))}`)
        }

        target.roles.add(mutedRole, reason)
            .then(() => message.channel.send({ embeds: [muteEmbed] }))
            .catch(e => {
                return message.channel.send({ embeds: [fbEmbed('error', 'Unable to mute user!', 'Might be because of member having higher permissions!')] })
            })

        if (!!time && !isNaN(parseInt(time))) {
            setTimeout(() => {
                if (target.roles.cache.get(mutedRole)) {
                    target.roles.remove(mutedRole).then(() => {
                        target.user.send({ embeds: [muteUserEmbed]})
                            .catch(e => console.log('Cannot DM this user'))
                    }).catch(e => console.log('cannot unmute this member'))

                }
            }, parseInt(time))
        }
    }
}

export default command