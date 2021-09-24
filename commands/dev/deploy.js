const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('../../config.json')

const rest = new REST({ version: 9 }).setToken(token)


// oh my god this code is so bad i am literally cringing rn ewewewewew *dies*
module.exports = {
    name: 'deploy',
    description: 'Deploys slash commands',
    aliases: ['slashuscommandus'], // slashuscommandus
    category: 'dev',
    permissions: 'BOT_DEV',
    async run (client, message, args) {
        require('../../handlers/slashCommand')(client, true)
            .then(() => {
                message.channel.send('Deployed!')
            })
    }
}