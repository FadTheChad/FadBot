import Schema from '../../schemas/User'
import { Snowflake } from 'discord.js'
import { Document } from 'mongoose'
import IUser from '../../structure/interfaces/db/IUser'

export const setBlacklisted = (userId: Snowflake, bool: boolean) => {
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
    })
}

export const isBlacklisted = async (userId: Snowflake): Promise<boolean> => {
    const result = await Schema.findOne({ _id: userId })

    if (!result) return false

    return result?.blacklisted
}

export const getBList = async () => {
    let list = await Schema.find({ blacklisted: true })

    return list.map(user => user.id)
}