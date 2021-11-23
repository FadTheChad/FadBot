// modules
import { Client, ClientOptions, Collection, Snowflake } from 'discord.js'
import { readdirSync } from 'fs'
import mongoose, { ConnectOptions } from 'mongoose'

// interfaces and configuration
import ICommand from "./interfaces/ICommand"
import IContextCommand from './interfaces/IContextCommand'
import IConfig from './interfaces/IConfig'

import _config from '../config.json'
const config: IConfig = _config

// handlers/loaders
import cmdHandler from '../handlers/command'
import slashCmdHandler from '../handlers/slashCommand'
import eventHandler from '../handlers/event'

// dbCache Utils/Interfaces
import { IGuildCache } from './interfaces/db/IGuild'
import { IUserCache } from './interfaces/db/IUser'

// Displays Bot Data
import displayResult from './client-utils/displayResult'
import FBLogger from './client-utils/FBLogger'

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

    public displayResult = displayResult

    // Custom Logging Util For FadBot (Inspired By 3vil's client.log)
    public fbLogger = new FBLogger({
        primary: [255, 255, 0],
        secondary: [0, 0, 0]
    })

    /*
      Database Cache, for storing db data locally for better performance
    */
    public dbCache: {
        guilds: Map<Snowflake, IGuildCache>,
        users: Map<Snowflake, IUserCache>
    } = {
        guilds: new Map<Snowflake, IGuildCache>(),
        users: new Map<Snowflake, IUserCache>()
    }

    // Searches if the selected cache is valid and creates an empty one if its not for validation
    public validateDbCache(cacheSection: Map<Snowflake, IGuildCache | object>, id: Snowflake): void {
        // we want to search for properties from a potential cache key by its ID
        let cachedData = cacheSection.get(id)

        // if it does not exist, we create an empty one
        if (!cachedData) cacheSection.set(id, {})
    }

    // clears the cache of the specified section or all
    public clearCache(cacheSection: Map<Snowflake, IGuildCache | IUserCache> | 'all') {
        if (cacheSection === 'all') {
            let self = this
            let key: keyof typeof self.dbCache

            for (key in this.dbCache) {
                let cachedData = this.dbCache[key]

                cachedData.clear()
            }
        } else {
            cacheSection.clear()
        }
    }

    // Database Connection Method
    public connectToDb(): void {
        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions).then(() => {
            this.fbLogger.log('MongooseConnection', 'Connected to MongoDB!\n')
        }).catch(e => {
            this.fbLogger.error(`Could not connect to MongoDB!\nError: ${e}`)
        })
    }

    // Initializer
    public async start(token: string) {
        this.fbLogger.log('Load', 'Starting bot...')

        this.loadCommands(this)
        await this.loadSlashCommands(this, false)
        this.loadEvents(this)

        this.displayResult(this)

        this.connectToDb()

        this.login(token)
    }
}