import fbEmbed from '../../utils/fbEmbed-utils'
import { sendFullHelp, sendCommandOrCategoryHelp, sendDropdownMenuHelp } from '../../utils/help-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'help',
    description: 'Sends a help embed of either all commands, a specifc command, or all the commands in a specifc category.',
    aliases: ['h'],
    usage: '\n1. [-dm]\n2. [-dd]\n3. [category | command] [-dm]',
    category: 'info',
    async run(client, message, args) {
        if (!args[0]) return sendFullHelp(client, message.channel)

        const errEmbed = fbEmbed('error', 'Failed To DM!', 'You might have DMs off!')
        const embed = fbEmbed('success', 'DM Successfully Sent!', 'Check your DMs!')

        if (args[0]?.toLowerCase() === '-dm') {
            try {
                const sent = await sendFullHelp(client, message.author)

                if (!sent) throw new Error('Cannot DM User')

                return message.channel.send({ embeds: [embed] })
            } catch (err) {
                return message.channel.send({ embeds: [errEmbed] })
            }
        }

        if (args[0]?.toLowerCase() === '-dd') return sendDropdownMenuHelp(client, message, message.author, false)

        if (args[1]?.toLowerCase() === '-dm') {
            try {
                const sent = await sendCommandOrCategoryHelp(client, message.author, args[0], message.author.id)

                if (!sent) throw new Error('Cannot DM User')

                return message.channel.send({ embeds: [embed] })
            } catch (err) {
                return message.channel.send({ embeds: [errEmbed] })
            }
        }

        sendCommandOrCategoryHelp(client, message.channel, args[0], message.author.id)
    }
}

export default command