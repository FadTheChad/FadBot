import { Message, MessageEmbed, TextBasedChannels } from 'discord.js'
import FBTypes from "../structure/interfaces/types/FBTypes";
import { IFBEmbedOptions, IFBEmbedTypeObject } from '../structure/interfaces/IFBEmbed'
import wait from './wait'

/**
 * A custom MessageEmbed function for FadBot
 * @param type - The type of embed (success | error)
 * @param title - The embed's title
 * @param [description] - The embed's description
 * @returns - The MessageEmbed
 * @author Fad F
 */
const fbEmbed = (type: FBTypes, title: string, description?: string): MessageEmbed => {
    const embed = new MessageEmbed()

    let emoji = ''
    let color = 0xFFFFFF

    if (type === 'success') {
        emoji = '<:FadBot_Tick:887599870024761434>'
        color = 0xFFFF00
    } else if (['error', 'err'].includes(type)) {
        emoji = '<:FadBot_Cross:887607566060888094>'
        color = 0x0000FF
    }

    embed.setTitle(`${emoji} ${title}`)
    if (description) embed.setDescription(description)
    embed.setColor(color)

    return embed
}

export default fbEmbed

/*
    Some Functions For Success and Err Shit
*/
export const success = (msg: string) => '<:FadBot_Tick:887599870024761434>' + ' ' + msg
export const err = (msg: string) => '<:FadBot_Cross:887607566060888094>' + ' ' + msg

// BUT WAIT! Theres More!

/**
 * A custom MessageEmbed Extended Class Util for FadBot. Possibly a new version of fbEmbed
 * @author Fad F
 */
export class FBEmbed extends MessageEmbed {
    public type: FBTypes = 'success'

    public success: IFBEmbedTypeObject = {
        emoji: '<:FadBot_Tick:887599870024761434>',
        colour: 0xFFFF00
    }

    public err: IFBEmbedTypeObject = {
        emoji: '<:FadBot_Cross:887607566060888094>',
        colour: 0x0000FF
    }

    constructor(options?: IFBEmbedOptions) {
        super(options)

        if (options?.success) this.success = options?.success
        if (options?.err) this.err = options?.err
    }

    public setBase(type: FBTypes, title: string, description?: string) {
        if (type === 'error') type = 'err'

        this.setTitle(this[type].emoji + ' ' + title)

        if (description) this.setDescription(description)

        this.setColor(this[type].colour)

        return this
    }

    // Broken atm kekw
    public async sendLoadingMsgAndEditConstantly(channel: TextBasedChannels, editArray: { loadMessage: string, callback: (embed?: FBEmbed) => Promise<boolean>, onResolveMsg: string, onRejectMsg: string }[], timeIntervalMs: number = 3) {
        let sentMessage = await channel.send({embeds: [this]})

        let successCount = 0, errCount = 0

        for (let editObj of editArray) {
            this.setDescription((this.description ? this.description + '\n\n' : '') + editObj?.loadMessage)
            sentMessage.edit({ embeds: [this] })

            let result = await editObj.callback(this)

            await wait(timeIntervalMs)

            let resultMsg: string
            let colour: number

            if (result) {
                resultMsg = success(editObj.onResolveMsg)
                colour = this.success.colour
                successCount++
            } else {
                resultMsg = err(editObj.onRejectMsg)

                colour = this.err.colour
                errCount++
            }

            this.setDescription(this.description + '\n\\> ' + resultMsg)

            this.setColor(colour)
            sentMessage.edit({ embeds: [this] })
        }
        this.setFooter('Calculating success rate...')
        sentMessage.edit({ embeds: [this] })

        await wait(2000)

        this.setColor((successCount >= errCount) ? this.success.colour : this.err.colour)
        this.setFooter(`${editArray.length} processes ran | success - ${successCount} | err - ${errCount}`)
        sentMessage.edit({ embeds: [this] })
    }

    public turnFieldsToJSON(excludedIndexes?: number[]) {
        let dataObj = {} as {[key: string]: string}

        for (let i = 0; i < this.fields.length; i++) {
            if (excludedIndexes?.includes(i)) continue

            let field = this.fields[i]

            dataObj[field.name] = field.value
        }

        this.fields = this.fields.filter(f => excludedIndexes?.includes(this.fields.indexOf(f)))

        this.setDescription('```json\n' + JSON.stringify(dataObj, null, 2) + '\n```')

        return this
    }

    // This might seem useless atm but its gonna be very important in the future ;)
    public deploy(): { embeds: MessageEmbed[] } | string {
        return { embeds: [this] }
    }
}