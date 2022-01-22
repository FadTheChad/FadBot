import fbEmbed from '../../utils/fbEmbed-utils'
import ICommand from '../../structure/interfaces/ICommand'
import {
    addBlacklistedWord,
    censorBLWord,
    getBlacklistedWords,
    removeBlacklistedWord
} from '../../utils/db/blacklisted-word-utils'

const command: ICommand = {
    name: 'blacklist',
    description: 'blacklists the given word',
    aliases: ['bl'],
    usage: '<level: {0, 1, 2}> <word(s)>',
    category: 'automoderation',
    permissions: 'BAN_MEMBERS',
    async run(client, message, args) {
        switch (args[0]) {
            case '-add':
                let addedWord = args[2]
                let level = parseInt(args[1])

                if (!addedWord || level == undefined || isNaN(level) || level < 0 || level > 2) return message.reply('dumb')

                addBlacklistedWord(message.guild!.id, addedWord, level, client)
                return message.reply('yay')

            case '-rem':
            case '-del':
            case '-remove':
            case '-delete':
                let deletedWord = args[1]

                if (!deletedWord) return message.reply('dumb')

                removeBlacklistedWord(message.guild!.id, deletedWord, client)
                return message.reply('yaaay')

            case '-list':
                let blacklistedWords = await getBlacklistedWords(message.guild!.id, client)

                message.reply(blacklistedWords.map(element => censorBLWord(element.word)).join('\n') || 'None lmao')
        }
    }
}

export default command