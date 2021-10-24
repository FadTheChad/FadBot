import { GuildMember } from 'discord.js'

const getStatusEmoji = (member: GuildMember): string => {
    const onlineEmoji = ':green_circle:'
    const idleEmoji = ':yellow_circle:'
    const dndEmoji = ':red_circle:'
    const offlineEmoji = ':black_circle:'
        
    if (!member.presence) return offlineEmoji

    switch (member.presence.status) {
        case 'online':
            return onlineEmoji

        case 'idle':
            return idleEmoji

        case 'dnd':
            return dndEmoji

        default:
            return offlineEmoji
    }
}

export default getStatusEmoji