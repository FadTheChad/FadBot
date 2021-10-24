import { Client, ClientOptions, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import mongoose, { ConnectOptions } from 'mongoose'

import ICommand from "./interfaces/ICommand"
import IContextCommand from './interfaces/IContextCommand'
import config from '../config.json'

import cmdHandler from '../handlers/command'
import slashCmdHandler from '../handlers/slashCommand'
import eventHandler from '../handlers/event'


/**
 * @description - The Custom Client Of FadBot
 * @author - Fad F
 */
export default class FadBotClient extends Client {
    constructor(options: ClientOptions) {
        super(options)
    }

    // Commands And Categories
    public commands: Collection<string, ICommand> = new Collection()
    public slashCommands: Collection<string, ICommand | IContextCommand> = new Collection()
    public categories: string[] = readdirSync('./commands')

    // Loaders
    public loadCommands = cmdHandler
    public loadSlashCommands = slashCmdHandler
    public loadEvents = eventHandler

    // Database Cache
    public dbCache: {
        guilds: { [key: string]: {} },
        users: { [key: string]: {} }
    } = {
        guilds: {},
        users: {}
    }

    // Database Connection Method
    public connectToDb(connectString: string): void {
        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions).then(() => {
            console.log('Connected to MongoDB!')
        }).catch(e => {
            console.log(`Could not connect to MongoDB!\nError: ${e}`)
        })
    }

    // Initializer
    public async start(token: string, connectionString: string) {
        this.loadCommands(this)
        await this.loadSlashCommands(this, false)
        this.loadEvents(this)

        this.connectToDb(connectionString)

        this.login(token)
    }
}