import IEvent from '../structure/interfaces/IEvent'

const event: IEvent = {
    name: 'ready',
    run (client) {
        client.fbLogger.log('Ready', `${client.user?.username} is ready!\n`)

        client.fbLogger.warn('This is a test warn')
        client.fbLogger.error('This is a test error', 'Ready')
    }
}

export default event