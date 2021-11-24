import FadBotClient from "../structure/Client";
import fs from 'fs'
import IEvent from "../structure/interfaces/IEvent";

const handler = (client: FadBotClient) => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js') || file.endsWith('ts'))
    client.fbLogger.log('Load', 'Loading events...', false, true)

    for (const file of eventFiles) {
	    const req = require(`../events/${file}`)

        const event: IEvent = req.default

        client.events.set(event.name, event)

        client.fbLogger.log('Event', `${event.name} event has been loaded!`, true)
	
        if (event.once) {
		    client.once(event.name, (...args) => event.run(client, ...args))
	    } else {
		    client.on(event.name, (...args) => event.run(client, ...args))
	    }
    }
}

export default handler