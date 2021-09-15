const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config.json');
const messageCreate = require('../events/messageCreate');

module.exports = {
    sendFullHelp: (client, location) => {
        const embed = new MessageEmbed()
            .setTitle("> FadBot Commands")
            .setDescription(`To get info about a specific command, run \`${prefix}help <command>\`!`)
            .setColor(0xFFFF00)
        
        for (let cat of client.categories) {
            const commands = client.commands.filter(c => c.category == cat);

            embed.addField(cat.charAt(0).toUpperCase() + cat.slice(1), commands.map(c => `\`${c.name}\``).join(", "));
        }
        
        location.send({embeds: [embed]});
    },

    sendCommandOrCategoryHelp: (client, location, searchedCommand, authorId) => {
        const cmdOrCat = client.commands.get(searchedCommand.toLowerCase()) || client.categories.find(cat => cat.toLowerCase() === searchedCommand.toLowerCase())

        if (!cmdOrCat) {
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
    }
}

        