import config from '../config.json'
import fbEmbed from '../utils/fbEmbed-utils'
import { getPrefix } from '../utils/db/prefix-utils'
import { Message } from 'discord.js'
import IEvent from '../structure/interfaces/IEvent'

const { prefix: guildPrefix , devs } = config

const event: IEvent = {
    name: 'messageCreate',
    async run (client, message: Message) {
        if (message.author.bot) return

        if (!message.guild && message.content.startsWith(guildPrefix)) return message.channel.send('Hey! At the time being, you can only run commands in servers! Sorry!')
        
        let prefix = await getPrefix(message.guild!?.id) || guildPrefix
        
        if (message.content.match(new RegExp('^<@!?' + client.user!.id + '>'))) return message.reply(`My prefix is \`${prefix}\``)

        if (!message.content.startsWith(prefix) || message.author.bot) return

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift()!?.toLowerCase()
        
        // get the command through the command name, or one of the aliases of the command
        const command = client.commands.get(commandName) || client.commands.find(cmd => !!cmd.aliases && (typeof cmd.aliases === 'string' ? commandName === cmd.aliases : cmd.aliases.includes(commandName)))
        
        //if the command does not exist, we can simply ignore
        if (!command) return

        if (command.permissions) {
            let { permissions } = command
                
            if ((permissions === 'BOT_DEV' || command.category === 'dev') && !devs.includes(message.author.id)) return
            
            if (typeof permissions === 'string') permissions = [permissions]
        
            for (const permission of permissions)  {
                if (permission === 'BOT_DEV') continue

                const permErrEmbed = fbEmbed('error', 'Invalid Permissions!')

                const member = message.member || await message.guild?.members.fetch(message.author.id)
                const botMember = message.guild?.me || await message.guild?.members.fetch(client.user!.id)

                // @ts-ignore
                if (!member!.permissions.has(permission)) {
                    permErrEmbed.setDescription('You don\'t have perms to run this command!')
                    return message.channel.send({embeds: [permErrEmbed]})
                }
                
                // @ts-ignore
                if (!botMember!.permissions.has(permission)) {
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
                'Hey you!\nYeah you!\nif you\'re seeing this message, it means that the bot owner did a stinky in writing the code thus you receiving an error after trying to run a command. sorry bout that.'
            )
                
            message.channel.send({embeds: [errEmbed]})
        }
    }   
}

export default event