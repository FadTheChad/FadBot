import { Status } from 'discord.js'

const statuses = {
    READY: 0,
    CONNECTING: 1,
    RECONNECTING: 2,
    IDLE: 3,
    NEARLY: 4,
    DISCONNECTED: 5,
    WAITING_FOR_GUILDS: 6,
    IDENTIFYING: 7,
    RESUMING: 8
}

const calculateClientStatus = (statusCode: Status): string => Object.keys(statuses).find(stat => statuses[stat as keyof typeof statuses] === statusCode) || 'DISCONNECTED'

export default calculateClientStatus