import FadBotClient from "../structure/Client";
import fs from 'fs'
import IEvent from "../structure/interfaces/IEvent";

const handler = (client: FadBotClient) => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js') || file.endsWith('ts'))
    console.log('\nLoading events...\n')

    for (const file of eventFiles) {
	    const req = require(`../events/${file}`)

        const event: IEvent = req.default

        console.log(`\t ${event.name} event has been loaded!`)
	
        if (event.once) {
		    client.once(event.name, (...args) => event.run(client, ...args))
	    } else {
		    client.on(event.name, (...args) => event.run(client, ...args))
	    }
    }
}

export default handler