const { sendFullDevHelp, sendCommandDevHelp } = require("../../utils/help-utils")

module.exports = {
    name: 'devhelp',
    description: 'Shows the list of Dev Commands',
    aliases: ['dhelp', 'devcmds'],
    usages: '[command]',
    category: 'dev',
    permissions: 'BOT_DEV',
    run (client, message, args) {
        if (!args[0]) sendFullDevHelp(client, message)
        else sendCommandDevHelp(client, args[0], message)
    }
}