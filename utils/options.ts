import { ClientOptions, Intents } from 'discord.js'
const { FLAGS } = Intents

const options: ClientOptions = {
    intents: [
        FLAGS.DIRECT_MESSAGES,
        FLAGS.GUILDS,
        FLAGS.GUILD_MESSAGES,
        FLAGS.GUILD_MEMBERS,
        FLAGS.GUILD_PRESENCES
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
    presence: {
        activities: [{
            name: 'Being Developed | >help For Help',
            type: 'PLAYING'
        }]
    }
}

export default options