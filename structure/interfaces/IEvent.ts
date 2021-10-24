import { ClientEvents } from "discord.js"
import FadBotClient from '../Client'

type Run = (
    client: FadBotClient,
    ...args: any[]
) => any

export default interface IEvent {
    name: keyof ClientEvents,
    once?: boolean,
    run: Run
}