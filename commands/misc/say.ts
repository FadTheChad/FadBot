import fbEmbed from "../../utils/fbEmbed-utils"
import ICommand from "../../structure/interfaces/ICommand";

const command: ICommand = {
    name: 'say',
    description: 'Makes the bot say the specified message',
    aliases: ['repeat'],
    usage: '<message>',
    category: 'misc',
    permissions: 'ADMINISTRATOR', // keeping this closed to admins because this can be heavily abused, so uh, yeah.
    run (client, message, args) {
        const said = args.join(' ')

        if (!said || !args[0]) {
            const errEmbed = fbEmbed('error', 'Message Not Specified!', 'Please specify a message!')

            return message.channel.send({embeds: [errEmbed]})
        }

        message.delete() //deletes the original message
        
        message.channel.send(said)
    }
}

export default command