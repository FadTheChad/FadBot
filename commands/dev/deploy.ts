import ICommand from "../../structure/interfaces/ICommand"
import slashHandler from '../../handlers/slashCommand'

// oh my god the handler code is fucking terrifying
const command: ICommand = {
    name: 'deploy',
    description: 'Deploys slash commands',
    aliases: ['slashuscommandus'], // slashuscommandus
    category: 'dev',
    permissions: 'BOT_DEV',
    async run (client, message, args) {
        await slashHandler(client, true)
            .then(() => {
                message.channel.send('Deployed!')
            })
    }
}

export default command