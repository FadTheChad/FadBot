import { devs } from '../config.json'
import fbEmbed from '../utils/fbEmbed-utils'
import IEvent from '../structure/interfaces/IEvent'
import { Interaction } from 'discord.js'

const event: IEvent = {
    name: 'interactionCreate',
    async run (client, interaction: Interaction) {
        if (interaction.isCommand()) {
            const slashCommand = client.slashCommands.get(interaction.commandName)

            // 
            if (!slashCommand || !slashCommand?.slashRun) return

            // 
            if (slashCommand.permissions) {
                // 
                let { permissions } = slashCommand

                // 
                if ((permissions === 'BOT_DEV' || slashCommand.category === 'dev') && !devs.includes(interaction.user.id)) return
                
                if (typeof permissions === 'string') permissions = [permissions]
            
                for (const permission of permissions)  {
                    const permErrEmbed = fbEmbed('error', 'Invalid Permissions!')

                    if (permission === 'BOT_DEV') continue

                    const member = interaction.member || await interaction.guild?.members.fetch(interaction.user.id)
                    const botMember = interaction.guild?.me || await interaction.guild?.members.fetch(client.user!.id)

                    // 
                    if (!member!.permissions.has(permission)) {
                        permErrEmbed.setDescription('You don\'t have perms to run this command!')
                        return interaction.reply({ embeds: [permErrEmbed], ephemeral: true })
                    }

                    // 
                    if (!botMember!.permissions.has(permission)) {
                        permErrEmbed.setDescription('I don\'t have perms to run this command!')
                        return interaction.reply({ embeds: [permErrEmbed], ephemeral: true })
                    }
                }
            
            }

            try {
                // 
                await slashCommand.slashRun!(client, interaction)
            } catch (err) {
                console.error(err)

                const errEmbed = fbEmbed(
                    'error',
                    'Error!', 
                    'Hey you!\nYeah you!\nif you\'re seeing this message, it means that the bot owner did a stinky in writing the code thus you receiving an error after trying to run a commound. sorry bout that.'
                )
                    
                interaction.reply({ embeds: [errEmbed], ephemeral: true })
            }
        }

        if (interaction.isContextMenu()) {
            const contextMenu = client.slashCommands.get(interaction.commandName)

            if (!contextMenu) return

            try {
                // 
                await contextMenu.contextRun(client, interaction)
            } catch (err) {
                console.error(err)

                const errEmbed = fbEmbed(
                    'error',
                    'Error!', 
                    'Hey you!\nYeah you!\nif you\'re seeing this message, it means that the bot owner did a stinky in writing the code thus you receiving an error after trying to run a commound. sorry bout that.'
                )
                    
                interaction.reply({ embeds: [errEmbed], ephemeral: true })
            }
        }
    }
}

export default event