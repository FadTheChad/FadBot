import ICommand from '../../structure/interfaces/ICommand'
import { hasBlacklistedWord } from '../../utils/db/blacklisted-word-utils'

const command: ICommand = {
    name: 'testbl',
    description: 'test bl system',
    category: 'dev',
    permissions: 'BOT_DEV',
    async run(client, message, args) {
        const content = args.join(' ')

        let bl = await hasBlacklistedWord(message.guild!.id, content, client)

        message.channel.send(JSON.stringify(bl) ?? 'not found lol')
    }
}

export default command