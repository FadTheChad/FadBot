module.exports = {
    name: 'dev',
    description: 'verifies if the user is a dev',
    aliases: ['developer'],
    category: 'dev',
    permissions: 'BOT_DEV',
    run (client, message, args) {
        message.reply('is dev')
    }
}