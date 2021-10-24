import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'dev',
    description: 'verifies if the user is a dev',
    aliases: ['developer'],
    category: 'dev',
    permissions: 'BOT_DEV',
    run (client, message, args) {
        message.reply('is dev')
    },
    async slashRun (client, interaction) {
        interaction.reply('is dev')
    }
}

export default command