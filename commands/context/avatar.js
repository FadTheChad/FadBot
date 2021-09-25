module.exports = {
    name: 'ctx-avatar',
    type: 2,
    async contextRun (client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId)

        interaction.reply(`${member.user.displayAvatarURL({ dynamic: true })}`)
    }
}