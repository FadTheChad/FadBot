const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'support',
    description: 'Sends the Official Support Server of FadBot.',
    aliases: ['server', 'supportserver', 'ss', 'guild'],
    category: 'info',
    run (client, message, args) {
        const embed = new MessageEmbed()
            .setTitle('Support Server')
            .setDescription('Wanna give suggestions about FadBot, need a helping hand with the bot? Or wanna hang out? Join our [Official Server](https://discord.gg/3tEGymY5pE)!')
            .setColor(0xFFFF00)

        message.channel.send({embeds: [embed]})
    }
}