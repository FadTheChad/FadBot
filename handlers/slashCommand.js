const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('../config.json')

const rest = new REST({ version: 9 }).setToken(token)

module.exports = async (client, forDeploy) => {
    const arrayOfSlashCommands = []

    for (const folder of client.categories) {
            
        const slashCommandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js'))
        console.log(`\nSearching ${folder} slash commands...\n`)

        for (const slashFile of slashCommandFiles) {
            const slashCommand = require(`../commands/${folder}/${slashFile}`)
                
            if (!slashCommand.slashRun && !slashCommand.contextRun) continue
                
            slashCommand.data = {}

            if (!slashCommand.type) slashCommand.data.type = 'CHAT_INPUT'

            slashCommand.data.name = slashCommand.name
            if (!["MESSAGE", "USER"].includes(slashCommand.type)) slashCommand.data.description = slashCommand.description
            slashCommand.data.options = slashCommand.options
            slashCommand.data.type = slashCommand.type

            if (!forDeploy) client.slashCommands.set(slashCommand.data.name, slashCommand)
            else arrayOfSlashCommands.push(slashCommand.data)

            console.log(`\t${slashCommand.data.name} has been ${forDeploy ? 'deployed' : 'loaded'} as a Slash Command!`)
        }
    }
        
    if (forDeploy) {
        try {
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: arrayOfSlashCommands }
            )

            console.log('Successfully registered Slash Commands!')
        } catch (err) {
            console.error(err)
        }
    }
}