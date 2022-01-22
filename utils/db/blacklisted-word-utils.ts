import FadBotClient from '../../structure/Client'
import Schema from '../../schemas/Guild'
import { Snowflake } from 'discord.js'
import { Document } from 'mongoose'
import IGuild from '../../structure/interfaces/db/IGuild'
import guild from '../../schemas/Guild'

// Gonna be real honest
// I have no fucking idea if this works
// i just wrote this in the middle of a nap so bad code incoming
// (not that i write good code when i am NOT in the mid of a nap kekw)

export const hasBlacklistedWord = async (guildId: Snowflake, content: string, client: FadBotClient) => {
    const getPossibilities = (word: string, pnc: string) => {
        let vowels = ['a', 'e', 'i', 'o', 'u']

        let positions = []

        for (let i = 0; i < word.length; i++) {
            if (vowels.indexOf(word[i]) !== -1) positions.push(i)
        }

        let result: string[] = [], count = 2 ** positions.length;

        for (let i = 0; i < count; i++) {
            let newWord = [...word]

            for (let j = 0; j < positions.length; j++) {
                if ((i >> j) & 1) newWord[positions[j]] = pnc
            }

            result.push(newWord.join(''))
        }
        return result
    }

    let blAlts = (await getBlacklistedWords(guildId, client)).map(blElement => {
        return { word: blElement.word, level: blElement.level, possibilities: [...new Set(['*', '#', '$'].map(p => getPossibilities(blElement.word, p)).flat(1))] }
    })

    let found = blAlts.filter(element => {
        const foundPossibility = element.possibilities.filter(p => {
            return content.toLowerCase().split(/ +/g).includes(p)
        })

        if (foundPossibility.length) return element
    })

    for (let lvl of [2, 1, 0]) {
        let lvlWord = found.find(element => element.level === lvl)

        if (lvlWord) return lvlWord
    }
}

export const addBlacklistedWord = (guildId: Snowflake, word: string, level: number, client: FadBotClient) => {
    Schema.findOne({ _id: guildId}, (err: Error, data: Document<any, any, IGuild> & IGuild & { _id: string; }) => {
        if (err) throw err

        if (data) {
            if (!data.config.blacklistedWords) data.config.blacklistedWords = []

            if (data.config.blacklistedWords.map(blElement => blElement.word.toLowerCase()).includes(word.toLowerCase())) return

            data.config.blacklistedWords.push({
                word,
                level
            })

            data.save()
        } else {
            data = new Schema({
                _id: guildId,
                config: {
                    blacklistedWords: [{
                        word,
                        level
                    }]
                }
            } as IGuild)

            data.save()
        }

        client.validateDbCache(client.dbCache.guilds, guildId)
        client.dbCache.guilds.get(guildId)!.blacklistedWords ??= (data?.config.blacklistedWords ?? [])

        if (client.dbCache.guilds.get(guildId)!.blacklistedWords!.map(blElement => blElement.word).includes(word)) return

        client.dbCache.guilds.get(guildId)!.blacklistedWords!.push({
            word,
            level
        })
    })
}

export const removeBlacklistedWord = (guildId: Snowflake, word: string, client: FadBotClient) => {
    Schema.findOne({ _id: guildId }, (err: Error, data: Document<any, any, IGuild> & IGuild & { _id: string; }) => {
        if (err) throw err

        if (data) {
            if (!data.config.blacklistedWords) return

            data.config.blacklistedWords = data.config.blacklistedWords.filter(blElement => blElement.word.toLowerCase() !== word.toLowerCase())

            data.save()
        }

        client.validateDbCache(client.dbCache.guilds, guildId)
        client.dbCache.guilds.get(guildId)!.blacklistedWords ??= (data?.config.blacklistedWords ?? [])

        let filtered = client.dbCache.guilds.get(guildId)!.blacklistedWords?.filter(blElement => blElement.word.toLowerCase() !== word.toLowerCase())

        client.dbCache.guilds.get(guildId)!.blacklistedWords = filtered
    })
}

export const getBlacklistedWords = async (guildId: Snowflake, client: FadBotClient) => {
    let cachedWords = client.dbCache.guilds.get(guildId)?.blacklistedWords

    if (cachedWords) return cachedWords

    let result = await Schema.findOne({ _id: guildId })

    client.validateDbCache(client.dbCache.guilds, guildId)
    client.dbCache.guilds.get(guildId)!.blacklistedWords = result?.config.blacklistedWords

    return result?.config.blacklistedWords ?? []
}

export const censorBLWord = (word: string): string => {
    let censoredWord = [...word].map((letter, index) => {
        if (index === 0) return letter + '||'
        if (index === [...word].length - 1) return '||' + letter
        return letter
    })

    return censoredWord.join('')
}