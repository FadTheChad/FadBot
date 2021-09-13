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
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})

// collection of our commands
client.commands = new Collection()

// collection of the command categories which are the folders in the commands folder
client.categories = fs.readdirSync('./commands')

// loads the commands
for (const folder of client.categories) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js'))
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    }
}

// loads the events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const event = require(`./events/${file}`)
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args, client))
	} else {
		client.on(event.name, (...args) => event.run(...args, client))
	}
}

client.login(config.token)
