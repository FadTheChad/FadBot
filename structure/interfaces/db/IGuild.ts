interface IChannelConfig {
    id: string,
    text: string
}

interface IGuildConfig {
    prefix: string,
    welcomeChannel: IChannelConfig,
    leaveChannel: IChannelConfig,
    mutedRole: string
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
    mutedRole?: string
}

