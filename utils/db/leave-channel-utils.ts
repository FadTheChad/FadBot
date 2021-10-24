import Schema from '../../schemas/Guild'
import { Snowflake } from "discord.js";
import { Document } from 'mongoose';
import IGuild from '../../structure/interfaces/db/IGuild';

export const setLeave = (guildId: Snowflake, channelId: Snowflake, text?: string) => {
    Schema.findOne({_id: guildId}, async (err: Error, data: Document<any, any, IGuild> & IGuild & { _id: string; }) => {
        if (err) throw err

        if (data) {
            data.config.leaveChannel.id = channelId
            if (text) data.config.leaveChannel.text = text

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    leaveChannel: {
                        id: channelId
                    }
                }
            })

            if (text) data.config.leaveChannel.text = text

            data.save()
        }
    })
}