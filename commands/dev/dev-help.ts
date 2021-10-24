import ICommand from '../../structure/interfaces/ICommand'
import { sendFullDevHelp, sendCommandDevHelp } from '../../utils/help-utils'

const command: ICommand = {
    name: 'devhelp',
    description: 'Shows the list of Dev Commands',
    aliases: ['dhelp', 'devcmds'],
    usage: '[command]',
    category: 'dev',
    permissions: 'BOT_DEV',
    run (client, message, args) {
        if (!args[0]) sendFullDevHelp(client, message)
        else sendCommandDevHelp(client, args[0], message)
    }
}

export default command