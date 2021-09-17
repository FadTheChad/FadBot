const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'avatar',
    description: 'Displays the avatar of the specified user.',
    aliases: ['av', 'pfp'],
    usages: '[member mention | id]',
    category: 'info',
    async run (client, message, args) {
        let member = message.mentions.members.first() || message.guild.members.fetch(args[0])

        if (!args[0]) member = undefined


        const embed = new MessageEmbed()
            .setTitle('Avatar')
            .setDescription(`Heres the avatar  <@${member ? member.id : message.author.id}> !`)
            .setImage((member) ? (member.user.displayAvatarURL({ dynamic: true })) : (message.author.displayAvatarURL({ dynamic: true })))
            .setColor(0xFFFF00)

        message.channel.send({ embeds: [embed] })
    }
}