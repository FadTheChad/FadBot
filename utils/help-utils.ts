import {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    TextChannel,
    DMChannel,
    Snowflake,
    Message,
    User,
    Interaction,
    TextBasedChannels
} from 'discord.js'

import { prefix } from '../config.json'
import fbEmbed from './fbEmbed-utils'
import FadBotClient from '../structure/Client'

const helpManager = {
    sendFullHelp: (client :FadBotClient, location: TextChannel | DMChannel | TextBasedChannels | User) => {
        const embed = new MessageEmbed()
            .setTitle("> FadBot Commands")
            .setDescription(`To get info about a specific command or commands in a specific category, run \`${prefix}help <command | category>\`!`)
            .setColor(0xFFFF00)
        
        for (let cat of client.categories) {
            if (cat === 'dev' || cat === 'context') continue
            
            const commands = client.commands.filter(c => c.category == cat);

            embed.addField(cat.charAt(0).toUpperCase() + cat.slice(1), commands.map(c => `\`${c.name}\``).join(", "));
        }
        
        return location.send({embeds: [embed]})?.catch(() => { })
    },

    sendCommandOrCategoryHelp: (client: FadBotClient, location: TextChannel | DMChannel | TextBasedChannels | User, searchedCommand: string, authorId: Snowflake) => {
        const cmd = client.commands.get(searchedCommand.toLowerCase()) || client.commands.find(cmd => !!cmd.aliases && cmd.aliases?.includes(searchedCommand.toLowerCase()))
        const cat = client.categories.find(cat => cat.toLowerCase() === searchedCommand.toLowerCase())

        if ((!cmd && !cat) || cmd?.category == 'dev' || ['dev', 'context'].includes(searchedCommand.toLowerCase())) {
            const errEmbed = new MessageEmbed()
                .setTitle('Command/Category Not Found')
                .setDescription('That command/category doesn\'t seem to exist. run `' + prefix + 'help` for a whole list of commands and categories!')
                .setColor(0xFFFF00)
            
            location.send({ embeds: [errEmbed] })?.catch(() => { })
            return
        }

        // if the searched word is found to be one of the categories
        if (cat) {
            const commands = client.commands.filter(c => c.category.toLowerCase() === cat?.toLowerCase())
            
            const embed = new MessageEmbed()
                .setTitle('Category Found!')
                .addField('Category', cat)
                .addField(`${cat.charAt(0).toUpperCase() + cat.slice(1)} Commands`, commands.map(c => `\`${c.name}\``).join(', '))
                .setColor(0xFFFF00)

            return location.send({ embeds: [embed] })?.catch(() => { })
        } else {
            const embed = new MessageEmbed()
                .setTitle('Command Found!')
                .addField('Command', cmd!.name)
                .setColor(0xFFFF00)

            if (cmd!.aliases) embed.addField('Aliases', Array.isArray(cmd!.aliases) ? cmd!.aliases.join(', ') : cmd!.aliases)

            if (cmd!.category) embed.addField('Category', cmd!.category)

            if (cmd!.description) embed.addField('Description', cmd!.description)

            if (cmd!.usage) embed.addField('Usage', '`' + prefix + cmd!.name + ' ' + cmd!.usage + '`')

            embed.addField('Permissions', cmd!.permissions ? (typeof cmd!.permissions === 'string' ? cmd!.permissions : cmd!.permissions.join(', ')) : 'Everyone')

            embed.setFooter(`${authorId}${cmd!.usage ? ' | <> - required, [] - optional' : ''}`)

            return location.send({embeds: [embed]})?.catch(() => { })
        }
    },

    sendFullDevHelp: (client: FadBotClient, message: Message) => {
        const devCommands = client.commands.filter(c => c.category === 'dev')

        let devEmbed = new MessageEmbed()
            .setTitle('Dev Commands')
            .setDescription(devCommands.map(devCmd => `\`${devCmd.name}\``).join(', '))
            .setColor(0xFFFF00)
        
        
        message.channel.send({embeds: [devEmbed]})
    },

    sendCommandDevHelp: (client: FadBotClient, searchedDevCommand: string, message: Message) => {
        const devCommand = client.commands.get(searchedDevCommand.toLowerCase()) || client.commands.find(cmd => !!cmd.aliases && cmd.aliases!?.includes(searchedDevCommand.toLowerCase()))
        
        if (!devCommand) return message.reply('Nope not a real command.')
        if (devCommand.category !== 'dev') return message.reply('Not a dev command lol')

        const embed = new MessageEmbed()
            .setTitle('Dev Command Found')
            .setColor(0xFFFF00)
        
        if (devCommand.aliases) embed.addField('Aliases', typeof devCommand.aliases === 'string' ? devCommand.aliases : devCommand.aliases.join(', '))
        if (devCommand.category) embed.addField('Category', devCommand.category)
        if (devCommand.description) embed.addField('Description', devCommand.description)
        if (devCommand.usage) embed.addField('Usage', '`' + prefix + devCommand.name + ' ' + devCommand.usage + '`')

        embed.addField('Permissions', devCommand.permissions ? (typeof devCommand.permissions === 'string' ? devCommand.permissions : devCommand.permissions.join(', ')) : 'Everyone')

        message.channel.send({ embeds: [embed] })
    },

    sendDropdownMenuHelp: async (client: FadBotClient, location: TextChannel | DMChannel | TextBasedChannels, author: User, isSlash?: boolean) => {
        const getHelpRow = (state: boolean) => {
            const helpMenu = new MessageSelectMenu()

            const helpOptions = []
            for (const category of client.categories) {
                if (category == 'dev' || category == 'context') continue

                helpOptions.push({
                    label: category.charAt(0).toUpperCase() + category.slice(1),
                    description: `List of the commands from the ${category} category`,
                    value: category
                })
            }

            const row = new MessageActionRow()
                .addComponents(
                    helpMenu
                        .setCustomId('Help Menu')
                        .setPlaceholder('Select a Category')
                        .addOptions(helpOptions)
                        .setDisabled(state)
                )

            return row
        }

        let initialMessage = await location.send({ embeds: [fbEmbed('success', 'Categories Loaded!')], components: [getHelpRow(false)] }).catch(() => { let initialMessage })

        if (!initialMessage) return

        let filter = (interaction: Interaction) => {
            return author.id === interaction.user.id
        }

        const collector = location.awaitMessageComponent({
            filter,
            time: 20000,
            componentType: 'SELECT_MENU'
        }).then(async i => {
            if (!i.isSelectMenu()) return

            await i.deferUpdate().catch(() => { })

            const [category] = i.values
            const ddEmbed = fbEmbed('success', `${category.charAt(0).toUpperCase() + category.slice(1)} Commands`, client.commands.filter(c => c.category == category).map(c => `\`${c.name}\``).join(', '))

            initialMessage!.edit({ embeds: [ddEmbed], components: [getHelpRow(true)] })
        })
            .catch(err => console.log(err))
    }
}

export const sendFullHelp = helpManager.sendFullHelp
export const sendCommandOrCategoryHelp = helpManager.sendCommandOrCategoryHelp
export const sendFullDevHelp = helpManager.sendFullDevHelp
export const sendCommandDevHelp = helpManager.sendCommandDevHelp
export const sendDropdownMenuHelp = helpManager.sendDropdownMenuHelp

        