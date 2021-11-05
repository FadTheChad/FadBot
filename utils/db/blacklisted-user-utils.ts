import Schema from '../../schemas/User'
import { Snowflake } from 'discord.js'
import { Document } from 'mongoose'
import IUser from '../../structure/interfaces/db/IUser'
import FadBotClient from '../../structure/Client'

export const setBlacklisted = (userId: Snowflake, bool: boolean, client: FadBotClient) => {
    Schema.findOne({_id: userId}, async (err: Error, data: Document<any, any, IUser> & IUser & { _id: string }) => {
        if (err) throw err

        if (data) {
            data.blacklisted = bool

            data.save()
        } else {
            data = new Schema({
                _id: userId,
                blacklisted: bool
            })

            data.save()
        }

        client.validateDbCache(client.dbCache.users, userId)

        client.dbCache.users.get(userId)!.blacklisted = bool
    })
}

export const isBlacklisted = async (userId: Snowflake, client: FadBotClient): Promise<boolean> => {
    let cachedValue = client.dbCache.users.get(userId)?.blacklisted

    if (cachedValue != undefined) return cachedValue

    const result = await Schema.findOne({ _id: userId })

    client.validateDbCache(client.dbCache.users, userId)

    client.dbCache.users.get(userId)!.blacklisted = result?.blacklisted ?? false

    if (!result) return false

    return result?.blacklisted
}

export const getBList = async (client: FadBotClient): Promise<Snowflake[]> => {
    let cachedList = [...client.dbCache.users.keys()].filter(key => {
        return client.dbCache.users.get(key)!.blacklisted
    })

    if (cachedList.length) return cachedList

    let list = await Schema.find({ blacklisted: true })

    return list?.map(user => user.id) || []
}