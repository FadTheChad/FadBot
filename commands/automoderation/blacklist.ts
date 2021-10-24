import fbEmbed from '../../utils/fbEmbed-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'blacklist',
    description: 'blacklists the given word',
    aliases: ['bl'],
    usage: '<level: {0, 1, 2}> <word(s)>',
    category: 'automoderation',
    permissions: 'BAN_MEMBERS',
    run (client, message, args) {
        const soon = fbEmbed('success', 'Soon! ;)')
    }
}

export default command