import FadBotClient from '../Client'
import { ContextMenuInteraction } from 'discord.js'

type ContextRun = (
    client: FadBotClient,
    interaction: ContextMenuInteraction
) => any | Promise<any>

type ContextName = `ctx-${string}`

export default interface IContextCommand {
    name: ContextName,
    type: number,
    contextRun: ContextRun
}