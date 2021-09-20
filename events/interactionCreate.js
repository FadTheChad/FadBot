module.exports = {
    name: 'interactionCreate',
    async run (interaction, client) {
        if (interaction.isCommand()) {
            const slashCommand = client.slashCommands.get(interaction.commandName)

            if (!slashCommand) return 

            try {
                await slashCommand.slashRun(client, interaction)
            } catch (err) {
                console.error(err)
            }
        }
    }
}