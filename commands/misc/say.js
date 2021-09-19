const { MessageEmbed } = require("discord.js")
const { fbEmbed } = require("../../utils/fbEmbed-utils")

module.exports = {
    name: 'say',
    description: 'Makes the bot say the specified message',
    aliases: ['repeat'],
    usage: '<message>',
    category: 'misc',
    permissions: 'ADMINISTRATOR', // keeping this closed to admins because this can be heavily abused, so uh, yeah.
    run (client, message, args) {
        const said = args.join(' ')

        if (!said || !args[0]) {
            // const errEmbed = new MessageEmbed()
            //     .setTitle('<:FadBot_Cross:887607566060888094> Message Not Specified!')
            //     .setDescription('Please specify a message!')
            //     .setColor(0x0000FF)

            const errEmbed = fbEmbed('error', 'Message Not Specified!', 'Please specify a message!')
            return message.channel.send({embeds: [errEmbed]})
        }

        message.delete() //deletes the original message
        
        message.channel.send(said)
    }
}