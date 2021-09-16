const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'channel',
    description: 'creates/deletes a channel',
    aliases: ['ch'],
    usage: '<-add | -delete> <channel name | channel ID>',
    category: 'utility',
    permissions: ['MANAGE_CHANNELS'],
    async run (client, message, args) {
        switch (args[0]) {
            case '-add':
                const channelName = args.slice(1).join(' ')
                
                if (!channelName) {
                    const errEmbed = new MessageEmbed()
                        .setTitle('<:FadBot_Cross:887607566060888094> Channel Name Undefined!')
                        .setDescription('Please a valid channel name')
                        .setColor(0x0000FF)
                    return message.channel.send({embeds: [errEmbed]})
                }

                message.guild.channels.create(channelName, {
                    parent: message.channel.parent
                }).then((channel) => {
                    const embed = new MessageEmbed()
                        .setTitle('<:FadBot_Tick:887599870024761434> Channel Created!')
                        .setDescription(`Channel <#${channel.id}> has been successfully created!`)
                        .setColor(0xFFFF00)

                    return message.channel.send({embeds: [embed]})
                })
                break
            case '-delete':
                const channel = message.mentions.channels.first() || await message.guild.channels.fetch(args[1])

                if (!channel || !args[1]) {
                    const errEmbed = new MessageEmbed()
                        .setTitle('<:FadBot_Cross:887607566060888094> Channel Not Found!')
                        .setDescription('Please specify a valid channel mention or id')
                        .setColor(0x0000FF)
                    return message.channel.send({embeds: [errEmbed]})
                }

                const embed = new MessageEmbed()
                    .setTitle('<:FadBot_Tick:887599870024761434> Channel Deleted!')
                    .setDescription(`Channel \`${channel.name}\` has been successfully deleted!`)
                    .setColor(0xFFFF00)

                channel.delete().then(() => message.channel.send({embeds: [embed]}))
                break
            default:
                const errEmbed = new MessageEmbed()
                        .setTitle('<:FadBot_Cross:887607566060888094> Invalid Flag!')
                        .setDescription('Please use `-add` or `-delete` to use this command!')
                        .setColor(0x0000FF)

                return message.channel.send({embeds: [errEmbed]})
                break
            }
    }
}