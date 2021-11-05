import fbEmbed  from '../../utils/fbEmbed-utils'
import { setBlacklisted, isBlacklisted, getBList } from '../../utils/db/blacklisted-user-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'userblacklists',
    description: 'Blacklists/Whitelists the specified user from using the bot',
    aliases: ['ubl'],
    category: 'dev',
    permissions: 'BOT_DEV',
    async run (client, message, args) {
        const user = message.mentions.users.first() || await client.users.fetch(args[1]).catch(() => { const user = undefined })

        const errEmbed = fbEmbed('error', 'User Not Found!', 'Please specify a valid user!')

        switch (args[0]) {
            case '-add':
                if (!user || !args[1]) return message.channel.send({ embeds: [errEmbed] })

                if (await isBlacklisted(user.id)) {
                    let embed = fbEmbed('error', 'User Already Blacklisted!', 'This user is already blacklisted!')

                    return message.channel.send({ embeds: [embed] })
                }

                setBlacklisted(user.id, true)

                const baseEmbed = fbEmbed('success', 'User Successfully Blacklisted!',`User <@${user.id}> has successfully been stinky'fied!`)

                let iEmbed = baseEmbed.addField('User DM Status', 'Pending...')

                const msg = await message.channel.send({ embeds: [iEmbed] })

                user.send({ embeds: [fbEmbed('error', 'Oops!', 'You have been blacklisted from FadBot by the devs! Contact devs for the reason!')] })
                    .then(() => {
                        baseEmbed.fields[0] = { name: 'User DM Status', value: 'Done!', inline: false }

                        msg.edit({ embeds: [baseEmbed] })
                    }).catch(() => {
                        baseEmbed.fields[0] = { name: 'User DM Status', value: 'Unsuccessful!', inline: false }

                        msg.edit({ embeds: [baseEmbed] })
                    })

                break
            case '-remove':
                if (!user || !args[1]) return message.channel.send({ embeds: [errEmbed] })

                if (!(await isBlacklisted(user.id))) {
                    let embed = fbEmbed('error', 'User Not Blacklisted!', 'This user is not blacklisted!')

                    return message.channel.send({ embeds: [embed] })
                }

                setBlacklisted(user.id, false)

                const wlBaseEmbed = fbEmbed('success', 'User Successfully Whitelisted!',`User <@${user.id}> has successfully been unstinky'fied!`)

                let wlIEmbed = wlBaseEmbed.addField('User DM Status', 'Pending...')

                const wlMsg = await message.channel.send({ embeds: [wlIEmbed] })

                user.send({ embeds: [fbEmbed('success', 'Yay!', 'You have been whitelisted from FadBot by the devs!')] })
                    .then(() => {
                        wlBaseEmbed.fields[0] = { name: 'User DM Status', value: 'Done!', inline: false }

                        wlMsg.edit({ embeds: [wlBaseEmbed] })
                    }).catch(() => {
                        wlBaseEmbed.fields[0] = { name: 'User DM Status', value: 'Unsuccessful!', inline: false }

                        wlMsg.edit({ embeds: [wlBaseEmbed] })
                })

                break
            case '-list':
                const embed = fbEmbed('success', 'Blacklisted Users', (await getBList())?.join('\n') ?? 'None')

                return message.channel.send({ embeds: [embed] })
            default:
                return message.channel.send({ embeds: [fbEmbed('error', 'Invalid Flag!' ,'Please use a valid flag! (`-add`, `remove`)')] })
        }
    }
}

export default command