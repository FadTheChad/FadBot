// modules
import { Client, ClientOptions, Collection, Snowflake } from 'discord.js'
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

    /* Database Cache, for storing db data locally for better performance */
    public dbCache: {
        guilds: Map<Snowflake, IGuildCache>,
        users: Map<Snowflake, object>
    } = {
        guilds: new Map<Snowflake, IGuildCache>(),
        users: new Map<Snowflake, object>()
    }

    // Searches if the selected cache is valid and creates an empty one if its not for validation
    public validateDbCache(cacheSection: Map<Snowflake, IGuildCache | object>, id: Snowflake): void {
        // we want to search for properties from a potential cache key by its ID
        let cachedData = cacheSection.get(id)

        // if it does not exist, we create an empty one
        if (!cachedData) cacheSection.set(id, {})
    }

    // clears the cache of the specified section or all
    public clearCache(cacheSection: Map<Snowflake, IGuildCache | object> | 'all') {
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