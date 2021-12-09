import ICommand from '../../structure/interfaces/ICommand'
import { FBEmbed } from '../../utils/fbEmbed-utils'
import wait from '../../utils/wait'

const command: ICommand = {
    name: 'dev',
    description: 'verifies if the user is a dev',
    aliases: ['developer'],
    category: 'dev',
    permissions: 'BOT_DEV',
    run (client, message, args) {
        message.reply('is dev')

        let embed = new FBEmbed().setBase('success', 'Testing')

        embed.sendLoadingMsgAndEditConstantly(message.channel, [{
            loadMessage: 'Trying to test time thing...',
            callback: async () => {
                return args[0] !== 'err';
            },
            onResolveMsg: 'Done!',
            onRejectMsg: 'Uh oh stinky'
        }, {
            loadMessage: 'Trying to test time thing...',
            callback: async () => {
                return args[0] !== 'err';
            },
            onResolveMsg: 'Done!',
            onRejectMsg: 'Uh oh stinky'
        }, {
            loadMessage: 'Trying to test time thing...',
            callback: async () => {
                return false
            },
            onResolveMsg: 'Done!',
            onRejectMsg: 'Uh oh stinky'
        }], 2500)
    },
    async slashRun (client, interaction) {
        interaction.reply('is dev')
    }
}

export default command