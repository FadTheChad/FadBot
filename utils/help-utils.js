const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { category } = require('../commands/misc/say');
const { prefix } = require('../config.json');

module.exports = {
    sendFullHelp: (client, location) => {
        const embed = new MessageEmbed()
            .setTitle("> FadBot Commands")
            .setDescription(`To get info about a specific command or commands in a specific category, run \`${prefix}help <command | category>\`!`)
            .setColor(0xFFFF00)
        
        for (let cat of client.categories) {
            if (cat === 'dev') continue
            
            const commands = client.commands.filter(c => c.category == cat);

            embed.addField(cat.charAt(0).toUpperCase() + cat.slice(1), commands.map(c => `\`${c.name}\``).join(", "));
        }
        
        location.send({embeds: [embed]});
    },

    sendCommandOrCategoryHelp: (client, location, searchedCommand, authorId) => {
        const cmdOrCat = client.commands.get(searchedCommand.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(searchedCommand.toLowerCase())) || client.categories.find(cat => cat.toLowerCase() === searchedCommand.toLowerCase())

        if (!cmdOrCat || cmdOrCat?.category == 'dev' || searchedCommand === 'dev') {
            const errEmbed = new MessageEmbed()
                .setTitle('Command/Category Not Found')
                .setDescription('That command/category doesn\'t seem to exist. run `' + prefix + 'help` for a whole list of commands and categories!')
                .setColor(0xFFFF00)
            
            return location.send({ embeds: [errEmbed] })
        }

        // if the searched word is found to be one of the categories
        if (client.categories.includes(cmdOrCat)) {
            const commands = client.commands.filter(c => c.category === cmdOrCat)
            
            const embed = new MessageEmbed()
                .setTitle('Category Found!')
                .addField('Category', cmdOrCat)
                .addField(`${cmdOrCat.charAt(0).toUpperCase() + cmdOrCat.slice(1)} Commands`, commands.map(c => `\`${c.name}\``).join(', '))
                .setColor(0xFFFF00)

            location.send({ embeds: [embed] })
        } else {
            const embed = new MessageEmbed()
                .setTitle('Command Found!')
                .addField('Command', cmdOrCat.name)
                .setColor(0xFFFF00)  

            if (cmdOrCat.aliases) embed.addField('Aliases', cmdOrCat.aliases.join(', '))
            if (cmdOrCat.category) embed.addField('Category', cmdOrCat.category)
            if (cmdOrCat.description) embed.addField('Description', cmdOrCat.description)
            if (cmdOrCat.usage) embed.addField('Usage', '`' + prefix + cmdOrCat.name + ' ' + cmdOrCat.usage + '`')

            embed.addField('Permissions', cmdOrCat.permissions ? (typeof cmdOrCat.permissions === 'string' ? cmdOrCat.permissions : cmdOrCat.permissions.join(', ')) : 'Everyone')
            
            embed.setFooter(`${authorId}${cmdOrCat.usage ? ' | <> - required, [] - optional' : ''}`)

            location.send({embeds: [embed]})
        }
    },

    sendFullDevHelp: (client, message) => {
        const devCommands = client.commands.filter(c => c.category === 'dev')

        let devEmbed = new MessageEmbed()
            .setTitle('Dev Commands')
            .setDescription(devCommands.map(devCmd => `\`${devCmd.name}\``).join(', '))
            .setColor(0xFFFF00)
        
        
        message.channel.send({embeds: [devEmbed]})
    },

    sendCommandDevHelp: (client, searchedDevCommand, message) => {
        const devCommand = client.commands.get(searchedDevCommand.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(searchedDevCommand.toLowerCase()))
        
        if (!devCommand) return message.reply('Nope not a real command.')
        if (devCommand.category !== 'dev') return message.reply('Not a dev command lol')

        const embed = new MessageEmbed()
            .setTitle('Dev Command Found')
            .setColor(0xFFFF00)
        
        if (devCommand.aliases) embed.addField('Aliases', devCommand.aliases.join(', '))
        if (devCommand.category) embed.addField('Category', devCommand.category)
        if (devCommand.description) embed.addField('Description', devCommand.description)
        if (devCommand.usage) embed.addField('Usage', '`' + prefix + devCommand.name + ' ' + devCommand.usage + '`')

        embed.addField('Permissions', devCommand.permissions ? (typeof devCommand.permissions === 'string' ? devCommand.permissions : devCommand.permissions.join(', ')) : 'Everyone')

        message.channel.send({ embeds: [embed] })
    },

    // no idea if this works. will test after i wake up lol
    sendDropdownMenuHelp: (client, location) => {
        const helpMenu = new MessageSelectMenu()

        const helpOptions = []
        for (category of client.categories) {
            if (category == 'dev') continue

            const commands = client.commands.filter(c => c.category == category)

            helpOptions.push({
                label: category.charAt(0).toUpperCase() + category.slice(1),
                description: `List of the commands from the ${category} category`,
                value: commands.map(c => `\`${c.name}\``).join(', ')
            })
        }
        
        const row = new MessageActionRow()
            .addComponents(
                helpMenu
                    .setCustomId('Help Menu')
                    .setPlaceholder('Select a Category')
                    .addOptions(helpOptions)
            )

        location.send({ content: 'Here you go!', components: [row] })
    }
}

        