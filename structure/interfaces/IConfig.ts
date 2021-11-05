import { Snowflake } from 'discord.js'

export default interface IConfig {
    token: string
    prefix: string
    devs: Snowflake[]
    clientId: Snowflake
    guildId: Snowflake
    mongoURI: string
}