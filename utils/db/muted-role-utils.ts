import Schema from '../../schemas/Guild'
import { Snowflake } from 'discord.js'
import { Document } from 'mongoose'
import IGuild from '../../structure/interfaces/db/IGuild'
import FadBotClient from '../../structure/Client'

export const setMutedRole = (guildId: Snowflake, mutedRole: Snowflake, client: FadBotClient) => {
    Schema.findOne({_id: guildId}, async (err: Error, data: Document<any, any, IGuild> & IGuild & { _id: string }) => {
        if (err) throw err

        if (data) {
            data.config.mutedRole = mutedRole

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    mutedRole
                }
            } as IGuild)

            data.save()
        }

        client.validateDbCache(client.dbCache.guilds, guildId)
        client.dbCache.guilds[guildId]!.mutedRole = mutedRole
    })
}

export const getMutedRole = async (guildId: Snowflake, client: FadBotClient): Promise<Snowflake | undefined | null> => {
    let cachedRole = client.dbCache.guilds[guildId]?.mutedRole

    if (cachedRole) return cachedRole

    const result = await Schema.findOne({ _id: guildId })

    return result?.config.mutedRole
}
