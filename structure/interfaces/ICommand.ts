import { CommandInteraction, Message } from "discord.js"
import { Permissions } from "./types/Permissions"
import FadBotClient from '../Client'

interface IData {
    name: string,
    description?: string,
    options?: any[],
    type: string | number
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

export default interface ICommand {
    data?: IData,
    name: string,
    description?: string,
    aliases?: string[] | string,
    type?: string | number
    options?: any[]
    usage?: string,
    category: string,
    permissions?: Permissions | Permissions[]
    run: Run,
    slashRun?: SlashRun,
}