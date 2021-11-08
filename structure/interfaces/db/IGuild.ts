interface IChannelConfig {
    id: string,
    text: string
}

export interface IBLWords {
    word: string,
    level: number
}

interface IGuildConfig {
    prefix: string,
    welcomeChannel: IChannelConfig,
    leaveChannel: IChannelConfig,
    mutedRole: string,
    blacklistedWords: IBLWords[]
}


export default interface IGuild {
    _id: string,
    config: IGuildConfig,
}

interface IChannelConfigCache {
    id?: string,
    text?: string
}


export interface IGuildCache {
    prefix?: string,
    welcomeChannel?: IChannelConfigCache,
    leaveChannel?: IChannelConfigCache,
    mutedRole?: string,
    blacklistedWords?: IBLWords[]
}

