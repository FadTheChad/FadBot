import fs from 'fs'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import FadBotClient from "../structure/Client"

import { clientId, guildId, token } from '../config.json'
import ICommand from '../structure/interfaces/ICommand'
import IContextCommand from '../structure/interfaces/IContextCommand'

const rest = new REST({ version: '9' }).setToken(token)

const handler = async (client: FadBotClient, forDeploy: boolean) => {
    const arrayOfSlashCommands = []

    for (const folder of client.categories) {
            
        const slashCommandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js') || file.endsWith('ts'))
        console.log(`\nSearching ${folder} slash commands...\n`)

        for (const slashFile of slashCommandFiles) {
            const req = require(`../commands/${folder}/${slashFile}`)

            const slashCommand: ICommand | IContextCommand = req.default

            slashCommand.data = {
                name: '',
                type: 1
            }

            // @ts-ignore
            if (!slashCommand.slashRun && !slashCommand.contextRun) continue

            slashCommand.data.name = slashCommand.name

            // @ts-ignore
            if (!["MESSAGE", "USER", 2, 3].includes(slashCommand.data.type)) slashCommand.data.description = slashCommand.description || ''

            // @ts-ignore
            slashCommand.data.options = slashCommand.options
            if (slashCommand.type) slashCommand.data.type = slashCommand.type

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

export default handler