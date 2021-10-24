import Schema from '../../schemas/Guild'
import { Snowflake } from 'discord.js'
import { Document } from 'mongoose'
import IGuild from '../../structure/interfaces/db/IGuild'

export const setMutedRole = (guildId: Snowflake, mutedRole: Snowflake) => {
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
    })
}

export const getMutedRole = async (guildId: Snowflake): Promise<Snowflake | undefined | null> => {
    const result = await Schema.findOne({ _id: guildId })

    return result?.config.mutedRole
}
