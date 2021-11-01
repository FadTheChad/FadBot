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

            if (!(slashCommand as ICommand).slashRun && !(slashCommand as IContextCommand).contextRun) continue

            slashCommand.type ??= 1

            if (["MESSAGE", "USER", 2, 3].includes(slashCommand.type)) delete (slashCommand as ICommand).description

            if (!forDeploy) client.slashCommands.set(slashCommand.name, slashCommand)
            else arrayOfSlashCommands.push(slashCommand)

            console.log(`\t${slashCommand.name} has been ${forDeploy ? 'deployed' : 'loaded'} as a Slash Command!`)
        }
    }
        
    if (forDeploy) {
        try {
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: arrayOfSlashCommands.map(c => {
                    delete (c as ICommand).permissions

                    return c
                }) }
            )

            console.log('Successfully registered Slash Commands!')
        } catch (err) {
            console.error(err)
        }
    }
}

export default handler