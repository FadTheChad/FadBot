import { MessageEmbed } from 'discord.js'
import fbEmbed from '../../utils/fbEmbed-utils'
import ICommand from "../../structure/interfaces/ICommand";

const command: ICommand = {
    name: 'ping',
    description: 'Ping!',
    aliases: ['test'],
    category: 'misc',
    run (client, message, args) {
        message.channel.send('Pinging...')
            .then(m => {
                const latency = m.createdTimestamp - message.createdTimestamp
                const apiLatency = Math.round(client.ws.ping)

                const embed = fbEmbed('success', 'Pong!')
                    .addField('Latency', `\`${latency}\`ms`)
                    .addField('API Latency', `\`${apiLatency}\`ms`)
                    .setFooter(message.author.id)
                    .setTimestamp()
                
                m.edit({content: null, embeds: [embed]})
            })
    },
    async slashRun(client, interaction) {
        await interaction.deferReply()
        
        const initialInteraction = await interaction.editReply('Pinging...')

        // 
        const latency = initialInteraction.createdTimestamp - interaction.createdTimestamp
        const apiLatency = Math.round(client.ws.ping)

        const embed = fbEmbed('success', 'Pong!')
            .addField('Latency', `\`${latency}\`ms`)
            .addField('API Latency', `\`${apiLatency}\`ms`)
            .setFooter(interaction.user.id)
            .setTimestamp()
                
        await interaction.editReply({content: null, embeds: [embed]})
    }
}

export default command