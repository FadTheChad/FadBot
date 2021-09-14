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

            embed.addField(cat.charAt(0).toUpperCase() + cat.slice(1), commands.map((c) => `\`${c.name}\``).join(", "));
        }
        
        location.send({embeds: [embed]});
    },

    sendCommandHelp: (client, location, searchedCommand) => {
        const cmd = client.commands.get(searchedCommand.toLowerCase())

        if (!cmd) {
            const errEmbed = new MessageEmbed()
                .setTitle('Command Not Found')
                .setDescription('That command doesn\'t seem to exist. run `' + prefix + 'help` for a whole list of commands!')
                .setColor(0xFFFF00)
            
            return location.send({ embeds: [errEmbed] })
        }

        const embed = new MessageEmbed()
            .setTitle('Command Found!')
            .addField('Command', cmd.name)
            .setColor(0xFFFF00)
            
        if (cmd.category) embed.addField('Category', cmd.category)

        if (cmd.description) embed.addField('Description', cmd.description)

        embed.addField('Permissions', cmd.permissions ? (typeof cmd.permissions === 'string' ? cmd.permissions : cmd.permissions.join(', ')) : 'Everyone')

        location.send({embeds: [embed]})
    }
}

        