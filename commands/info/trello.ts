import fbEmbed from '../../utils/fbEmbed-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'trello',
    description: 'Sends the trello board for FadBot',
    aliases: ['board'],
    category: 'info',
    run (client, message, args) {
        const embed = fbEmbed('success', 'Trello board', 'Want to see the plans the FadBot devs have in minf? Head over to our [Trello Board](https://trello.com/b/4qiwoazB/fadbot-board) to see ideas and upcoming features!')
        message.channel.send({ embeds: [embed]})
    }
}

export default command