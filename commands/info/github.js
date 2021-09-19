const { MessageEmbed } = require("discord.js")
const { fbEmbed } = require("../../utils/fbEmbed-utils")

module.exports = {
    name: 'github',
    description: 'Sends the Official Github Repo of FadBot',
    aliases: ['gh', 'repo'],
    category: 'info',
    run (client, message, args) {
        const embed = fbEmbed('success', 'Github Link', 'Want to see how FadBot is made? Check out our [Github Repo](https://github.com/FadTheChad/FadBot)!')
            .setImage('https://repository-images.githubusercontent.com/405949027/df6760df-3ca9-44e6-9bd5-c0b62465bbe9')

        message.channel.send({ embeds: [embed]})
    }
}