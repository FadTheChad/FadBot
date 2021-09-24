const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const { fbEmbed } = require('../utils/fbEmbed-utils')
const { prefix, devs } = config

module.exports = {
    name: 'messageCreate',
    run (message, client) {
        if (message.content.match(new RegExp('^<@!?' + client.user.id + '>'))) return message.reply(`My prefix is \`${prefix}\``)
        
        if (!message.content.startsWith(prefix) || message.author.bot) return
            
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        
        // get the command through the command name, or one of the aliases of the command
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && (typeof cmd.aliases === 'string' ? commandName === cmd.aliases : cmd.aliases.includes(commandName)))
        
        //if the command does not exist, we can simply ignore
        if (!command) return

        if (command.permissions) {
            let { permissions } = command
                
            if ((permissions === 'BOT_DEV' || command.category === 'dev') && !devs.includes(message.author.id)) return
            
            if (typeof permissions === 'string') permissions = [permissions]
        
            for (const permission of permissions)  {
                const permErrEmbed = fbEmbed('error', 'Invalid Permissions!')
                
                if (!message.member.permissions.has(permission)) {
                    permErrEmbed.setDescription('You don\'t have perms to run this command!')
                    return message.channel.send({embeds: [permErrEmbed]})
                }
                
                if (!message.guild.me.permissions.has(permission)) {
                    permErrEmbed.setDescription('I don\'t have perms to run this command!')
                    return message.channel.send({embeds: [permErrEmbed]})
                }
            }
        
        }
        try {
            command.run(client, message, args)
            console.log(`\nCommand Ran!\nCommand: ${command.name}\nUser: ${message.author.username}\nGuild: ${message.guild ? message.guild.name : 'None'}\n`)
        } 
        catch (err) {
            console.error(`\nThere was an error running the command ${command.name}!\nError: ${err}`);
            
            // You don't realize how many times i see this embed everyday
            const errEmbed = fbEmbed(
                'error',
                'Error!', 
                'Hey you!\nYeah you!\nif you\'re seeing this message, it means that the bot owner did a stinky in writing the code thus you receiving an error after trying to run a commound. sorry bout that.'
            )
                
            message.channel.send({embeds: [errEmbed]})
        }
    }   
}