import { MessageEmbed } from 'discord.js'
import list from '../../utils/8ball-utils'
import fbEmbed from '../../utils/fbEmbed-utils'
import ICommand from "../../structure/interfaces/ICommand";

const command: ICommand = {
    name: '8ball',
    description: 'Sends a random 8ball answer',
    aliases: ['fortune'],
    usage: '<question>',
    category: 'misc',
    run (client, message, args) {
        if (!args[0]) {
            const errEmbed = fbEmbed('error', 'Question Not Given!', 'Please specify a question for FadBot to answer!')

            return message.channel.send({ embeds: [errEmbed] })
        }
        
        const pick = list[Math.floor(Math.random() * list.length)]

        const embed = new MessageEmbed()
            .setTitle(':8ball: 8ball')
            .addField('Question', args.join(' '))
            .addField('Response/Answer', pick)
            .setColor(0xFFFF00)

        message.channel.send({ embeds: [embed] })
    }
}

export default command