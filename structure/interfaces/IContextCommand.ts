import FadBotClient from '../Client'
import { ContextMenuInteraction } from 'discord.js'

interface IData {
    name: ContextName,
    type: string | number
}

type ContextRun = (
    client: FadBotClient,
    interaction: ContextMenuInteraction
) => any | Promise<any>

type ContextName = `ctx-${string}`

export default interface IContextCommand {
    data?: IData
    name: ContextName,
    type: number,
    contextRun: ContextRun
}