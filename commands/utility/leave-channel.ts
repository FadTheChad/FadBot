import fbEmbed from '../../utils/fbEmbed-utils'
import { setLeave } from '../../utils/db/leave-channel-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'leavechannel',
    description: 'Sets the leave channel and message for the server.',
    aliases: ['leave', 'leavech', 'lc'],
    usage: '<leave channel> [text]\nIn text you can use\n\n{member} - Left member\n{memberId} - Left member\'s ID\n{server} - Server name',
    category: 'utility',
    permissions: 'MANAGE_CHANNELS',
    run (client, message, args) {
        const channel = message.mentions.channels.first() || message.guild!.channels.cache.get(args[0])

        if (!channel) {
            const errEmbed = fbEmbed('error', 'Leave Channel Not Specified', 'Please specify a leave channel!')

            return message.channel.send({ embeds: [errEmbed] })
        }

        let text
        if (args[1]) text = args.slice(1).join(' ')

        setLeave(message.guild!.id, channel.id, client, text)

        message.channel.send(`Works! maybe.`)
    }
}

export default command