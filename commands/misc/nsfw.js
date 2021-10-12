// SIKE you thought bitch

module.exports = {
    name: 'nsfw',
    description: 'Sends nsfw',
    aliases: ['haram', 'pokimane', 'egirl'],
    category: 'misc',
    async run(client, message, args) {
        await message.reply("You naughty naughty!");
        await message.channel.send('https://tenor.com/view/haram-heisenberg-gif-20680378')
        await message.member.ban();
    }
}