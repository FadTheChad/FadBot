import fbEmbed from '../../utils/fbEmbed-utils'
import ICommand from '../../structure/interfaces/ICommand'
import { GuildMember } from 'discord.js'

const command: ICommand = {
    name: 'avatar',
    description: 'Displays the avatar of the specified user.',
    aliases: ['av', 'pfp'],
    usage: '[member mention | id]',
    category: 'info',
    async run (client, message, args) {
        let member: GuildMember | void = message.mentions.members!?.first() || await message.guild!.members.fetch(args[0]).catch(() => { let member })

        if (!args[0]) member = undefined


        const embed = fbEmbed('success', 'Avatar Found!', `Here's the avatar  <@${member ? member.id : message.author.id}> !`)
            .setImage((member) ? (member.user.displayAvatarURL({ dynamic: true })) : (message.author.displayAvatarURL({ dynamic: true })))

        message.channel.send({ embeds: [embed] })
    }
}

export default command