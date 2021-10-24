// SIKE you thought bitch

import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'nsfw',
    description: 'Sends nsfw',
    aliases: ['haram', 'pokimane', 'egirl'],
    category: 'misc',
    run (client, message, args) {
        message.channel.send('https://tenor.com/view/haram-heisenberg-gif-20680378')
    }
}

export default command