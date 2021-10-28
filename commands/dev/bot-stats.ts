import ICommand from '../../structure/interfaces/ICommand'
import fbEmbed from '../../utils/fbEmbed-utils'
import calculateClientStatus from '../../utils/calculate-client-status'
import getTimeFromMS from '../../utils/get-time'

const command: ICommand = {
    name: 'botstats',
    description: 'Displays statistics of the bot',
    aliases: ['statistics', 'fbstats'],
    category: 'dev',
    permissions: 'BOT_DEV',
    run (client, message, args) {
        let totalServers = client.guilds.cache.size
        let totalMembers = 0

        for (let [, guild] of client.guilds.cache) {
            totalMembers += guild.memberCount
        }

        let statistics = fbEmbed('success', 'Bot Stats')
            .addField('Total Servers', '`' + totalServers.toString() + '`')
            .addField('Total Users', '`' + totalMembers.toString() + '`')
            .addField('API Latency', client.ws.ping.toString())
            .addField('Uptime', client.uptime != null ? getTimeFromMS(client.uptime) : 'UNKNOWN')
            .addField('Status', calculateClientStatus(client.ws.status))

        message.reply({ embeds: [statistics] })
    }
}

export default command