const { MessageEmbed } = require("discord.js")
const { fbEmbed } = require("../../utils/fbEmbed-utils")

module.exports = {
    name: 'purge',
    description: 'Clears the amount of specified messages',
    aliases: ['clear', 'delete'],
    usage: '<amount>',
    category: 'moderation',
    permissions: 'MANAGE_MESSAGES',
    async run (client, message, args) {
        const count = args[0]

        let errEmbed = fbEmbed('error', 'Purge Error!')

        if (!count) {
            errEmbed.setDescription('Please specify how many messages to delete!')
            return message.channel.send({ embeds: [errEmbed] })
        }

        // if the first arg IS specified, we want to check if that arg is actually a number or not
        if (isNaN(count)) {
            errEmbed.setDescription('Please specify a number!')
            return message.channel.send({ embeds: [errEmbed] })
        }

        if (parseInt(count) <= 0 || parseInt(count) > 50) {
            errEmbed.setDescription('Please select an amount between 1 and 50')
            return message.channel.send({ embeds: [errEmbed] })
        }

        // if you wanted to delete 1 message, it would delete the msg where you ran this command, hence we do +1
        message.channel.bulkDelete(parseInt(count) + 1).then(() => {
            const embed = fbEmbed('success', 'Purged Successfully!', `Successfully purged ${count} message${parseInt(count) !== 1 ? 's' : ''}!`)

            message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete(), 3000))
        })
    }
}