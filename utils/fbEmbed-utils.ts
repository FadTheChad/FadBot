import { MessageEmbed } from "discord.js";
import FBTypes from "../structure/interfaces/types/FBTypes";

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