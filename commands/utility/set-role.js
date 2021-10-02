const { setMutedRole } = require("../../utils/db/muted-role-utils");
const { fbEmbed } = require("../../utils/fbEmbed-utils");

module.exports = {
    name: 'setrole',
    description: 'Sets special roles for the server.',
    aliases: ['sr'],
    usage: '<type { muted | m }> <role>',
    category: 'utility',
    permissions: 'MANAGE_ROLES',
    run (client, message, args) {
        switch (args[0]) {
            case 'muted':
            case 'm':
                const mutedRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!mutedRole) {
                    const embed = fbEmbed('error', 'Role Not Found!', 'Please specify a valid role!')

                    return message.channel.send({ embeds: [embed] })
                }

                setMutedRole(message.guild.id, mutedRole.id)

                message.channel.send({ embeds: [fbEmbed('success', 'Muted Role Successfully Set!', `Role <@&${mutedRole.id}> has been set as the muted role for this server!`)] })
        }
    }
}