import IEvent from '../structure/interfaces/IEvent'

const event: IEvent = {
    name: 'ready',
    once: true,
    run (client) {
        client.fbLogger.log('Ready', `${client.user?.username} is ready!\n`)
    }
}

export default event