import ms, { StringValue } from 'ms'
import fbEmbed from '../../utils/fbEmbed-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'ban',
    description: 'bans the user',
    aliases: ['yeet', 'eliminate', 'nobebis'],
    usage: '<member> [time: {s, m, h, d} default: perm] [reason]',
    category: 'moderation',
    permissions: 'BAN_MEMBERS',
    async run (client, message, args) {
        //the member that the user is trying to ban
        const target = message.mentions.members!?.first() || await message.guild!.members.fetch(args[0]).catch(e => { const target = undefined })

        console.log(target)
        //if the target is not found
        if (!target || !args[0]) return message.channel.send('Please provide a valid user to ban')
        
        if (target.id === message.author.id) return message.channel.send('I am afraid that you cannot ban yourself..')

        if (target.id === client.user!.id) return message.channel.send('You\'re gonna ban me? **I am unbannable...**')

        if (!message.member) await message.guild!.members.fetch(message.author.id)

        if (target.roles.highest.id === message.member!.roles.highest.id || target.roles.highest.id === message.guild!.me?.roles.highest.id) return message.channel.send('The member you are trying to ban has the same role as you/me!')

        let time = args[1] ? ms(args[1] as StringValue) : null

        let reason = (!time || isNaN(time) ? args.slice(1).join(' ') : args.slice(2).join(' ')) || 'No Reason Specified'

        const banEmbed = fbEmbed('success', 'User Banned!')
            .addField('Banned User', `${target.user.tag} (${target.id})`)
            .addField('Reason', reason)
            .setColor(0xFFFF00)
        
        const banUserEmbed =  fbEmbed('error', 'Banned!', `You have been banned from ${message.guild!.name}!`)
            .addField('Reason', reason)

        if (!!time && !isNaN(time)) {
            banEmbed.addField('Duration', `${ms(time)}`)
            banUserEmbed.addField('Duration', `${ms(time)}`)
        }

        const targetId = target.id

        target.user.send({ embeds: [banUserEmbed] }).catch(err => {
            console.log('Oop can\'t DM this user')
        })
        
        target.ban()
            .then(() => {
                message.channel.send({ embeds: [banEmbed] })
            }).catch(e => {
                return message.channel.send({ embeds: [fbEmbed('error', 'Unable to ban user!', 'Might be because of member having higher permissions!')] })
            })

        if (!!time && !isNaN(time)) {
            setTimeout(async () => {
                const found = await message.guild!.bans.fetch(targetId).catch(e => console.log('Ban does not exist'))
                console.log(found)
                if (found) {
                    message.guild!.members.unban(targetId)
                        .then(() => {
                            const unBanEmbed = fbEmbed('success', 'Unbanned!', `You have been unbanned from ${message.guild!.name}`)

                            found.user.send({ embeds: [unBanEmbed] }).catch(e => console.log('cannot DM user'))
                        })
                        .catch(e => console.log('Unable to unban user'))
                }
            }, time)
        }
    }
}

export default command