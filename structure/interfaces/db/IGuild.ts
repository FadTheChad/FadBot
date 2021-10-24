interface IChannelConfig {
    id: string,
    text: string
}

interface IConfig {
    prefix: string,
    welcomeChannel: IChannelConfig,
    leaveChannel: IChannelConfig,
    mutedRole: string
}

export default interface IGuild {
    _id: string,
    config: IConfig,
}