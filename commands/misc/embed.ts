import { MessageEmbed } from "discord.js"
import fbEmbed from "../../utils/fbEmbed-utils"
import checkEmbed from '../../utils/embed-utils'

import ICommand from "../../structure/interfaces/ICommand";

const command: ICommand = {
    name: 'embed',
    description: 'Sends a custom embed',
    aliases: ['e', 'em'],
    usage: '<embed json>',
    category: 'misc',
    permissions: 'ADMINISTRATOR',
    run (client, message, args) {
        try {
            const said = JSON.parse(args.join(' '))

            const badRequest = checkEmbed(said)

            if (badRequest) throw new Error(badRequest)

            const embed = new MessageEmbed(said)

            message.channel.send({ embeds: [embed] })
        } catch (err) {
            const errEmbed = fbEmbed('error', 'Invalid JSON!', 'Please use a valid json format!')
                .addField('Error', `\`\`\`\n${err}\n\`\`\``)

            message.channel.send({ embeds: [errEmbed] })
        }
    }
}

export default command