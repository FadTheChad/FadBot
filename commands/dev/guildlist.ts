import { MessageEmbed } from 'discord.js'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'guildlist',
    description: 'verifies if the user is a dev',
    aliases: ['guilds'],
    category: 'dev',
    permissions: 'BOT_DEV',
    async run (client, message, args) {
        const guilds = await client.guilds.fetch()

        const embed = new MessageEmbed()
            .setTitle('FadBot Guilds')
            .setColor(0xFFFF00)

        let i = 1
        
        guilds.map(guild => {
            embed.addField(`Guild ${i}`, `${guild.name} (${guild.id})`)
            i++
        })

        message.channel.send({embeds: [embed]})
    }
}

export default command