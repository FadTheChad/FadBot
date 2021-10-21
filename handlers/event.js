const fs = require('fs')

module.exports = (client) => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
    console.log('\nLoading events...\n')
    
    for (const file of eventFiles) {
	    const event = require(`../events/${file}`)
    
        console.log(`\t ${event.name} event has been loaded!`)
	
        if (event.once) {
		    client.once(event.name, (...args) => event.run(client, ...args))
	    } else {
		    client.on(event.name, (...args) => event.run(client, ...args))
	    }
    }
}