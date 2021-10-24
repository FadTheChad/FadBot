import fbEmbed from '../../utils/fbEmbed-utils'
import { setPrefix } from '../../utils/db/prefix-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'prefix',
    description: 'Sets the prefix for the server.',
    aliases: ['pfx, setprefix'],
    usage: '<new prefix>',
    category: 'utility',
    permissions: 'ADMINISTRATOR',
    async run (client, message, args) {
        let newPrefix = args[0]

        if (newPrefix.toLowerCase() === '-default') newPrefix = '>'

        if (!newPrefix || newPrefix.length > 3) {
            const errEmbed = fbEmbed('error', 'Invalid Prefix!', 'Please specify a valid prefix of 1-3 characters!')

            return message.channel.send({ embeds: [errEmbed] })
        }

        setPrefix(message.guild!.id, newPrefix)

        message.channel.send('Works maybe!')
    }
}

export default command