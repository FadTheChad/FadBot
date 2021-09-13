module.exports = {
    name: 'ban',
    description: 'bans the user',
    permissions: 'BAN_MEMBERS',
    async run(client, message, args) {
        //the member that the user is trying to ban
        const target = message.mentions.members.first() || await message.guild.members.fetch(args[0])
        
        //if the target is not found
        if (!target || !args[0]) return message.channel.send('Please provide a valid user to ban')
        
        message.channel.send(`<@${target.id}> has been banned!`)
    }
}