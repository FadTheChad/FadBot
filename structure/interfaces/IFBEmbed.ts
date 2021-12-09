import { MessageEmbedOptions } from 'discord.js'
import FBType from './types/FBTypes'

export interface IFBEmbedTypeObject {
    emoji: string,
    colour: number
}

export interface IFBEmbedOptions extends MessageEmbedOptions {
    success?: IFBEmbedTypeObject,
    err?: IFBEmbedTypeObject
}