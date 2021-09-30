const { Client, Intents, Collection } = require('discord.js')
const { FLAGS } = Intents
const fs = require('fs')
const mongoose = require('mongoose')
const config = require('./config.json')


const client = new Client({
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
})

// collection of our commands
client.commands = new Collection()

// yes discord i finally implemented slash commands now please let my family go
client.slashCommands = new Collection()

// collection of the command categories which are the folders in the commands folder
client.categories = fs.readdirSync('./commands')

// loads the commands
require('./handlers/command')(client)

// loads the slash commands
require('./handlers/slashCommand')(client, false)

// loads the events
require('./handlers/event')(client)

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB!')
}).catch(e => {
    console.log(`Could not connect to MongoDB!\nError: ${e}`)
})

client.login(config.token)
