const { sendFullHelp, sendCommandOrCategoryHelp } = require("../../utils/help-utils")

module.exports = {
    name: 'help',
    description: 'Sends a help embed of either all commands, a specifc command, or all the commands in a specifc category.',
    aliases: ['h'],
    category: 'info',
    run(client, message, args) {
        !args[0] 
        ? sendFullHelp(client, message.channel) 
        : sendCommandOrCategoryHelp(client, message.channel, args[0], message.author.id)
    }
}