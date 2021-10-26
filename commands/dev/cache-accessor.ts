import ICommand from '../../structure/interfaces/ICommand'

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

        message.reply(`${JSON.stringify(cachedData, null, 2).slice(0, 2000)}`)
    }
}

export default command