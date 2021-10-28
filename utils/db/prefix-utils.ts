import Schema from '../../schemas/Guild'
import { Snowflake } from 'discord.js'
import { Document } from 'mongoose'
import IGuild from '../../structure/interfaces/db/IGuild'
import { prefix as defaultPrefix } from '../../config.json'
import FadBotClient from '../../structure/Client'

let prefixCache: {[key: string]: string | undefined} = {}

export const setPrefix = (guildId: Snowflake, newPrefix: string, client: FadBotClient) => {
    Schema.findOne({_id: guildId}, async (err: Error, data: Document<any, any, IGuild> & IGuild & { _id: string }) => {
        if (data) {
            data.config.prefix = newPrefix

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    prefix: newPrefix
                }
            })

            data.save()
        }

        //if (!client.dbCache.guilds[guildId]) client.dbCache.guilds[guildId] = {}
        client.validateDbCache(client.dbCache.guilds, guildId)

        client.dbCache.guilds.get(guildId)!.prefix = newPrefix
    })
}

export const getPrefix = async (guildId: Snowflake, client: FadBotClient) => {
    const cachedPrefix = client.dbCache.guilds.get(guildId)?.prefix

    if (cachedPrefix) return cachedPrefix

    const result = await Schema.findOne({ _id: guildId })

    client.validateDbCache(client.dbCache.guilds, guildId)

    client.dbCache.guilds.get(guildId)!.prefix = result?.config.prefix || defaultPrefix

    return result?.config.prefix
}