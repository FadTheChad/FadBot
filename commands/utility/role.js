const { MessageEmbed } = require("discord.js");
const { fbEmbed } = require('../../utils/fbEmbed-utils')

module.exports = {
    name: 'role',
    description: 'creates/deletes/adds/takes a role',
    aliases: 'rl',
    usage: ' 1. <-create | -delete> <role>\n2. <-give | -take> [member]',
    category: 'utility',
    permissions: 'MANAGE_ROLES',
    async run (client, message, args) {
        let errEmbed = fbEmbed('error', 'Role Error!')
        
        switch (args[0]) {
            case '-create':
                const roleName = args.slice(1).join(' ')

                if (!args[1] || !roleName) {
                    errEmbed.setDescription('Please specify the name of the role you want to create!')

                    return message.channel.send({ embeds: [errEmbed]})
                }

                message.guild.roles.create({
                    name: roleName
                }).then(role => {
                    const embed = fbEmbed('success', 'Role Created!', `Role <@&${role.id}> has been successfully created!`)

                    message.channel.send({ embeds: [embed] })
                })
                break;
            case '-delete':
                const role = message.mentions.roles.first() || await message.guild.roles.fetch(args[1])
            
                if (!args[1] || !role) {
                    errEmbed.setDescription('Please specify a valid role mention or role id!')

                    return message.channel.send({ embeds: [errEmbed]})
                }

                try {
                    role.delete().then(role => {
                        const embed = fbEmbed('success', 'Role Deleted!',`Role \`${role.name}\` has been successfully deleted!`)

                        message.channel.send({ embeds: [embed] })
                    })
                } catch (err) {
                    errEmbed.setDescription('Cannot delete the role! The role you are trying to delete might be higher than the highest role of the bot!')

                    return message.channel.send({ embeds: [errEmbed] })
                }
                break
            case '-give':
                const roleToGive = message.mentions.roles.first() || await message.guild.roles.fetch(args[1])
                const memberToGiveTo = message.mentions.members.first() || await message.guild.members.fetch(args[2])

                if ((!roleToGive || !args[1]) || (!memberToGiveTo || !args[2])) {
                    errEmbed.setDescription('Please specify a valid member/role mention or id!')

                    return message.channel.send({ embeds: [errEmbed] })
                }

                if (memberToGiveTo.roles.cache.find(r => r.id === roleToGive.id)) {
                    errEmbed.setDescription('The member already has this role!')

                    return message.channel.send({ embeds: [errEmbed] })
                }

                try {
                    memberToGiveTo.roles.add(roleToGive.id).then(member => {
                        const embed = fbEmbed('success', 'Role Successfully Given!', `Role <@&${roleToGive.id}> has been successfully given to <@${member.id}>`)

                        message.channel.send({ embeds: [embed] })
                    })
                } catch (err) {
                    errEmbed.setDescription('Cannot give this role to the member! Either the members highest role, or the role you are trying to give, is higher than the bot\'s')

                    return message.channel.send({ embeds: [errEmbed] })
                }
                break
            case '-take':
                const roleToTake = message.mentions.roles.first() || await message.guild.roles.fetch(args[1])
                const memberToTakeFrom = message.mentions.members.first() || await message.guild.members.fetch(args[2])

                if ((!roleToTake || !args[1]) || (!memberToTakeFrom || !args[2])) {
                    errEmbed.setDescription('Please specify a valid member/role mention or id!')

                    return message.channel.send({ embeds: [errEmbed] })
                }

                if (!memberToTakeFrom.roles.cache.find(r => r.id === roleToTake.id)) {
                    errEmbed.setDescription('The member does not have this role!')

                    return message.channel.send({ embeds: [errEmbed] })
                }

                try {
                    memberToTakeFrom.roles.remove(roleToTake.id).then(member => {
                        const embed = fbEmbed('success', 'Role Successfully Taken!', `Role <@&${roleToTake.id}> has been successfully taken from <@${member.id}>`)

                        message.channel.send({ embeds: [embed] })
                    })
                } catch (err) {
                    errEmbed.setDescription('Cannot take this role from the member! Either the members highest role, or the role you are trying to take, is higher than the bot\'s!')

                    return message.channel.send({ embeds: [errEmbed] })
                }
                break
            default:
                errEmbed.setDescription('Please use a valid flag! (`-create`, `-delete`, `-give`, `-take`)')

                return message.channel.send({ embeds: [errEmbed] })
                break
        }
    }
}