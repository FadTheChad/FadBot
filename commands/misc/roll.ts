import fbEmbed from '../../utils/fbEmbed-utils'
import exceedsLimit from '../../utils/roll-utils'
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'roll',
    description: 'Gives a random number between the specified numbers.',
    usage: '<min number> <max number>',
    category: 'misc',
    run (client, message, args) {
        if (!args[0] || !args[1]) return message.channel.send({ embeds: [fbEmbed(
            'error',
            'Invalid Args!',
            'Please specify 2 numbers!'
        )] })

        if (isNaN(parseInt(args[0])) || isNaN(parseInt(args[1]))) return message.channel.send({ embeds: [fbEmbed(
            'error',
            'Invalid Number!',
            'One/Both of the arguments is not a number!'
        )] })

        if (exceedsLimit(parseInt(args[0]), 1, 100000) || exceedsLimit(parseInt(args[1]), 1, 100000)) return message.channel.send({ embeds: [fbEmbed(
            'error',
            'Limit Exceeded!',
            'Both nums should be between 1 and 100000!'
        )] })

        if (parseInt(args[0]) >= parseInt(args[1])) return message.channel.send({ embeds: [fbEmbed(
            'error',
            'Wrong Order!',
            'Min cannot be greater than or equals to Max!'
        )] })

        const min = parseInt(args[0])
        const max = parseInt(args[1])

        const embed = fbEmbed('success', 'Rolled!')
            .addField('Min', args[0])
            .addField('Max', args[1])
            .addField('You Rolled', `${Math.floor(Math.random() * (max - min + 1)) + min}`)

        message.channel.send({ embeds: [embed] })
    }
}

export default command