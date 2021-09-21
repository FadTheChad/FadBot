const { fbEmbed } = require("../../utils/fbEmbed-utils")
const { sendFullHelp, sendCommandOrCategoryHelp, sendDropdownMenuHelp } = require("../../utils/help-utils")

// at the time, this code is very bad. But ill try to somehow clean it with a switch statement
module.exports = {
    name: 'help',
    description: 'Sends a help embed of either all commands, a specifc command, or all the commands in a specifc category.',
    aliases: ['h'],
    usage: '\n1. [-dm]\n2. [-dd]\n3. [category | command] [-dm]',
    category: 'info',
    run (client, message, args) {
        if (!args[0]) return sendFullHelp(client, message.channel) 
        
        const errEmbed = fbEmbed('error', 'Failed To DM!', 'You might have DMs off!')
        const embed = fbEmbed('success', 'DM Successfully Sent!', 'Check your DMs!')

        if (args[0] == '-dm') {
            try {
                sendFullHelp(client, message.author)
                return message.channel.send({ embeds: [embed] })
            } catch (err) {
                return message.channel.send({ embeds: [errEmbed] })
            }
        }
        
        if (args[0] === '-dd') return sendDropdownMenuHelp(client, message.channel, message.author, false)
        
        if (args[1] == '-dm') {
            try {
                sendCommandOrCategoryHelp(client, message.author, args[0], message.author.id)
                return message.channel.send({ embeds: [embed] })
            } catch(err) {
                message.channel.send({ embeds: [errEmbed] })
            } 
        }
        
        sendCommandOrCategoryHelp(client, message.channel, args[0], message.author.id)
    }
}