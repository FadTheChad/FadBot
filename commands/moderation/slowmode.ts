import { MessageEmbed } from "discord.js"
import fbEmbed from "../../utils/fbEmbed-utils"
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'slowmode',
    description: 'Manages the slowmode of the current channel',
    aliases: ['sm', 'slow'],
    usage: '[amount]',
    category: 'moderation',
    permissions: 'MANAGE_MESSAGES',
    run (client, message, args) {
        let amount: string = args[0]

        if (!amount) {
            const embed = fbEmbed('success', 'Slowmode Found!') // 
                .addField('Current Slowmode', message.channel.rateLimitPerUser !== 0 ? `\`${message.channel.rateLimitPerUser.toString()}\` seconds` : 'None')

            message.channel.send({ embeds: [embed] })
        } else {
            if (amount.toLowerCase() === "none") amount = '0'
            
            if (isNaN(parseInt(amount)) || parseInt(amount) < 0 || parseInt(amount) > 3600) {
                const errEmbed = new MessageEmbed()
                    .setTitle('<:FadBot_Cross:887607566060888094> Invalid Amount!')
                    .setDescription('Please enter a valid slowmode between 1 to 3600!')
                    .setColor(0x0000FF)

                return message.channel.send({ embeds: [errEmbed]})
            }

            const embed = fbEmbed('success', 'Slowmode Successfully Set!') // 
                .addField('Initial Slowmode', message.channel.rateLimitPerUser !== 0 ? `\`${message.channel.rateLimitPerUser.toString()}\` seconds` : 'None')
                .addField('Final Slowmode', `\`${amount}\` seconds`)

            // 
            message.channel.setRateLimitPerUser(parseInt(amount)).then(() => message.channel.send({ embeds: [embed] }))
        }
    }
}

export default command
