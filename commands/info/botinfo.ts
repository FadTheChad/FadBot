import fbEmbed from '../../utils/fbEmbed-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'botinfo',
    description: 'Sends info of FadBot',
    aliases: ['bi'],
    category: 'info',
    run (client, message, args) {
        const embed = fbEmbed(
            'success', 
            'FadBot Info', 
            'FadBot is a multi-purpose discord bot currently being developed. Its set to have some moderation commands; fun commands; commands that use the new API features like buttons, dropdowns and etc; and many other features along the way!'
        )
            .addField('Devs', 'Fad The Chad (DankML)#8516')
            .addField('Version', 'v1.1.0')
            .addField('Github', '[Leave us a star for support!](https://github.com/FadTheChad/FadBot)', true)
            .addField('Support Server', '[Join our Official Support Server!](https://discord.gg/3tEGymY5pE)', true)
            .addField('Trello', '[Get A Look At Upcoming Features and Ideas!](https://trello.com/b/4qiwoazB/fadbot-board)', true)
            .setThumbnail('https://github.com/FadTheChad/FadBot/blob/main/public/logo.png?raw=true')

        message.channel.send({ embeds: [embed] })
    }
}

export default command