const { MessageEmbed } = require('discord.js')
const { fbEmbed } = require('../../utils/fbEmbed-utils')

module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: ['test'],
    category: 'misc',
    run (client, message, args) {
        message.channel.send('Pinging...')
            .then(m => {
                const latency = m.createdTimestamp - message.createdTimestamp
                const apiLatency = Math.round(client.ws.ping)
                
                // const embed = new MessageEmbed()
                //     .setTitle('<:FadBot_Tick:887599870024761434> Pong!')
                //     .addField('Latency', `\`${latency}\`ms`)
                //     .addField('API Latency', `\`${apiLatency}\`ms`)
                //     .setFooter(message.author.id)
                //     .setTimestamp()
                //     .setColor(0xFFFF00)

                const embed = fbEmbed('success', 'Pong!')
                    .addField('Latency', `\`${latency}\`ms`)
                    .addField('API Latency', `\`${apiLatency}\`ms`)
                    .setFooter(message.author.id)
                    .setTimestamp()
                
                m.edit({content: null, embeds: [embed]})
            })
    }
}