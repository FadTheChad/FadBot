const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'slowmode',
    description: 'Manages the slowmode of the current channel',
    aliases: ['sm', 'slow'],
    usage: '[amount]',
    category: 'moderation',
    permissions: 'MANAGE_MESSAGES',
    run (client, message, args) {
        let amount = args[0]

        if (!amount) {
            const embed = new MessageEmbed()
                .setTitle('<:FadBot_Tick:887599870024761434> Slowmode Found!')
                .addField('Current Slowmode', message.channel.rateLimitPerUser != 0 ? `\`${message.channel.rateLimitPerUser.toString()}\` seconds` : "None")
                .setColor(0xFFFF00)

            message.channel.send({ embeds: [embed] })
        } else {
            if (amount.toLowerCase() === "none") amount = 0
            
            if (isNaN(amount) || parseInt(amount) < 0) {
                const errEmbed = new MessageEmbed()
                    .setTitle('<:FadBot_Cross:887607566060888094> Invalid Amount!')
                    .setDescription('Please enter a valid slowmode between 1 to 3600!')
                    .setColor(0x0000FF)

                return message.channel.send({ embeds: [errEmbed]})
            }

            const embed = new MessageEmbed()
                .setTitle('<:FadBot_Tick:887599870024761434> Slowmode Successfully Set!')
                .addField('Initial Slowmode', message.channel.rateLimitPerUser != 0 ? `\`${message.channel.rateLimitPerUser.toString()}\` seconds` : "None")
                .addField('Final Slowmode', `\`${amount}\` seconds`)
                .setColor(0xFFFF00)

            message.channel.setRateLimitPerUser(parseInt(amount)).then(() => message.channel.send({ embeds: [embed] }))
        }
    }
}