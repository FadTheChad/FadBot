import Schema from '../../schemas/Guild'
import { Snowflake } from 'discord.js'
import { Document } from 'mongoose'
import IGuild from '../../structure/interfaces/db/IGuild'
import { prefix as defaultPrefix } from '../../config.json'

let prefixCache: {[key: string]: string | undefined} = {}

export const setPrefix = (guildId: Snowflake, newPrefix: string) => {
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

        prefixCache[guildId] = newPrefix
    })
}

export const getPrefix = async (guildId: Snowflake) => {
    const cachedPrefix = prefixCache[guildId]

    if (cachedPrefix) return cachedPrefix

    const result = await Schema.findOne({ _id: guildId })

    prefixCache[guildId] = result?.config.prefix || defaultPrefix

    return result?.config.prefix
}