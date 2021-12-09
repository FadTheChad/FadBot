import Schema from '../../schemas/Guild'
import { Snowflake } from 'discord.js'
import { IGuildConfig } from '../../structure/interfaces/db/IGuild'

const getGuildData = async (guildId: Snowflake): Promise<IGuildConfig | {}> => {
    let guildData = await Schema.findOne({ _id: guildId })

    if (!guildData) return {}

    return guildData.config
}