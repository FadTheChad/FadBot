const { Client, Intents, Collection } = require('discord.js')
const { FLAGS } = Intents
const fs = require('fs')
const config = require('./config.json')


const client = new Client({
    intents: [
        FLAGS.DIRECT_MESSAGES,
        FLAGS.GUILDS,
        FLAGS.GUILD_MESSAGES,
        FLAGS.GUILD_MEMBERS
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
for (const folder of client.categories) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js'))
    console.log(`\nSearching ${folder} commands...\n`)
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
        console.log(`\t${file} has been loaded!`)
    }
}

// collection of the event files in the 'events' folder
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
console.log('\nLoading events...\n')
// loads the events
for (const file of eventFiles) {
	const event = require(`./events/${file}`)
    console.log(`\t ${event.name} event has been loaded!`)
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args, client))
	} else {
		client.on(event.name, (...args) => event.run(...args, client))
	}
}

client.login(config.token)
