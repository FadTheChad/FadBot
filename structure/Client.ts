// modules
import { Client, ClientOptions, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import mongoose, { ConnectOptions } from 'mongoose'

// interfaces and configuration
import ICommand from "./interfaces/ICommand"
import IContextCommand from './interfaces/IContextCommand'
import config from '../config.json'

// handlers/loaders
import cmdHandler from '../handlers/command'
import slashCmdHandler from '../handlers/slashCommand'
import eventHandler from '../handlers/event'

// dbCache Utils/Interfaces
import { IGuildCache } from './interfaces/db/IGuild'

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

    // Database Cache, for storing db data locally for better performance
    public dbCache: {
        guilds: { [key: string]: IGuildCache | undefined},
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