import Schema from '../../schemas/Guild'
import { Snowflake } from 'discord.js'
import { Document } from 'mongoose'
import IGuild from '../../structure/interfaces/db/IGuild'
import FadBotClient from '../../structure/Client'

export const setWelcome = (guildId: Snowflake, channelId: Snowflake, client: FadBotClient, text?: string) => {
    Schema.findOne({_id: guildId}, async (err: Error, data: Document<any, any, IGuild> & IGuild & { _id: string }) => {
        if (err) throw err

        if (data) {
            data.config.welcomeChannel.id = channelId
            if (text) data.config.welcomeChannel.text = text

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    welcomeChannel: {
                        id: channelId
                    }
                }
            })

            if (text) data.config.welcomeChannel.text = text

            data.save()
        }

        client.validateDbCache(client.dbCache.guilds, guildId)
        client.dbCache.guilds[guildId]!.welcomeChannel = {
            id: channelId,
            text: text ?? '{member} has joined the server!'
        }
    })
}