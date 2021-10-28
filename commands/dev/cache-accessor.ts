import ICommand from '../../structure/interfaces/ICommand'
import convertMapToString from '../../utils/convert-map-to-string'

const command: ICommand = {
    name: 'cacheaccessor',
    description: 'Dev tool for accessing dbCache of FadBotClient',
    aliases: ['cacheaccess', 'accesscache', 'dbcache'],
    category: 'dev',
    permissions: 'BOT_DEV',
    run (client, message, args) {
        let cacheSection = args[0]
        if (!Object.keys(client.dbCache).includes(cacheSection)) return message.reply('That cacheSection doesnt even exist lmao')

        let cachedData = client.dbCache[cacheSection as keyof typeof client['dbCache']]

        message.channel.send(('```\n' + convertMapToString(cachedData) + '\n```').slice(0, 1980) || 'None')
    }
}

export default command