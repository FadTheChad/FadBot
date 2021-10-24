import fbEmbed from '../../utils/fbEmbed-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'support',
    description: 'Sends the Official Support Server of FadBot.',
    aliases: ['server', 'supportserver', 'ss', 'guild'],
    category: 'info',
    run (client, message, args) {
        const embed = fbEmbed(
            'success',
            'Support Server!',
            'Wanna give suggestions about FadBot, need a helping hand with the bot? Or wanna hang out? Join our [Official Server](https://discord.gg/3tEGymY5pE)!'
        )

        message.channel.send({embeds: [embed]})
    }
}

export default command