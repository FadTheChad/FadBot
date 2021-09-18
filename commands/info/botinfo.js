const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'botinfo',
    description: 'Sends info of FadBot',
    aliases: ['bi'],
    category: 'moderation',
    run (client, message, args) {
        const embed = new MessageEmbed()
            .setTitle('FadBot Info')
            .setDescription('FadBot is a multi-purpose discord bot currently being developed. Its set to have some moderation commands; fun commands; commands that use the new API features like buttons, dropdowns and etc; and many other features along the way!')
            .addField('Devs', 'Fad The Chad (DankML)#8516')
            .addField('Version', 'v0.6.0')
            .addField('Github', '[Leave us a star for support!](https://github.com/FadTheChad/FadBot)', true)
            .addField('Support Server', '[Join our Official Support Server!](https://discord.gg/3tEGymY5pE)', true)
            .setColor(0xFFFF00)
            .setImage(client.user.avatarURL({dynamic: true}))

        message.channel.send({embeds: [embed]})
    }
}