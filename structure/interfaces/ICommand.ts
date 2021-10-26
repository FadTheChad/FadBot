import { ApplicationCommandOption, CommandInteraction, Message } from 'discord.js'
import { Permissions } from "./types/Permissions"
import FadBotClient from '../Client'
import { readdirSync } from 'fs'

const categories = <const>[...readdirSync('./commands')]


interface IData {
    name: string,
    description?: string,
    options?: ApplicationCommandOption[],
    type: number
}

type Run = (
    client: FadBotClient,
    message: Message,
    args: string[]
) => any | Promise<any>

type SlashRun = (
    client: FadBotClient,
    interaction: CommandInteraction
) => any | Promise<any>

type Category = typeof categories[number]

export default interface ICommand {
    data?: IData,
    name: string,
    description?: string,
    aliases?: string[] | string,
    type?: number
    options?: any[]
    usage?: string,
    category: Category,
    permissions?: Permissions | Permissions[]
    run: Run,
    slashRun?: SlashRun,
}