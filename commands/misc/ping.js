const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: ['test'],
    category: 'misc',
    run(client, message, args) {
        message.channel.send('Pinging...')
            .then(m => {
                const latency = m.createdTimestamp - message.createdTimestamp
                const apiLatency = Math.round(client.ws.ping)
                
                const embed = new MessageEmbed()
                    .setTitle(':white_check_mark: Pong!')
                    .addField('Latency', `\`${latency}\`ms`)
                    .addField('API Latency', `\`${apiLatency}\`ms`)
                    .setFooter(message.author.id)
                    .setTimestamp()
                    .setColor(0xFFFF00)
                
                m.edit({content: null, embeds: [embed]})            
                
            })
    }
}