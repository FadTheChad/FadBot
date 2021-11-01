import ICommand from '../../structure/interfaces/ICommand'
import fbEmbed from '../../utils/fbEmbed-utils'
import { MessageEmbed } from 'discord.js'

const command: ICommand = {
    name: 'decache',
    description: 'Removes guild cache of the bot aka reloads the bot',
    aliases: ['reload'],
    category: 'utility',
    permissions: 'ADMINISTRATOR',
    async run (client, message, args) {
        const initialEmbed = new MessageEmbed().setTitle('Decaching...').setColor(0xFFA500)

        let loadingMessage = await message.channel.send({ embeds: [initialEmbed]})

        let guildCache = client.dbCache.guilds.get(message.guild!.id)

        if (!guildCache || !Object.keys(guildCache)) {
            loadingMessage.edit({ embeds: [fbEmbed('success', 'Cache Already Cleared!')] })
        } else {
            let totalKeys = Object.keys(guildCache)

            client.dbCache.guilds.set(message.guild!.id, {})

            loadingMessage.edit({ embeds: [
                fbEmbed('success', 'Cache Cleared Successfully!', `\`${totalKeys.length}\` module${totalKeys.length > 1 ? 's' : ''} have been decached`)
                ]
            })
        }
    }
}

export default command