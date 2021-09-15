const { sendFullHelp, sendCommandOrCategoryHelp } = require("../../utils/help-utils")

module.exports = {
    name: 'help',
    description: 'Sends a help embed related to FadBot Commands.',
    category: 'info',
    run(client, message, args) {
        !args[0] 
        ? sendFullHelp(client, message.channel) 
        : sendCommandOrCategoryHelp(client, message.channel, args[0])
    }
}