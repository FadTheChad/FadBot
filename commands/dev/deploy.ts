import ICommand from "../../structure/interfaces/ICommand"

// oh my god the handler code is fucking terrifying
const command: ICommand = {
    name: 'deploy',
    description: 'Deploys slash commands',
    aliases: ['slashuscommandus'], // slashuscommandus
    category: 'dev',
    permissions: 'BOT_DEV',
    async run (client, message, args) {
        require('../../handlers/slashCommand')(client, true)
            .then(() => {
                message.channel.send('Deployed!')
            })
    }
}

export default command