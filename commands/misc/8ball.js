const { MessageEmbed } = require('discord.js')
const { list } = require('../../utils/8ball-utils')

module.exports = {
    name: '8ball',
    description: 'Sends a random 8ball answer',
    aliases: ['fortune'],
    usage: '<question>',
    category: 'misc',
    run (client, message, args) {
        if (!args[0]) {
            const errEmbed = new MessageEmbed()
                .setTitle('<:FadBot_Cross:887607566060888094> Question Not Given!')
                .setDescription('Please specify a question for FadBot to answer!')
                .setColor(0x0000FF)

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