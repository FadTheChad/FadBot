module.exports = {
    name: 'content',
    type: 3,
    async contextRun(client, interaction) {
        const msg = await interaction.channel.messages.fetch(interaction.targetId)

        interaction.reply(`Said: ${msg.content}\nBy: ${msg.author.tag}`)
    }
}