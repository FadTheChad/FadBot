import IEvent from '../structure/interfaces/IEvent'

const event: IEvent = {
    name: 'ready',
    run (client) {
        console.log(`\n\n${client.user?.username} is ready!\n`)
    }
}

export default event