import FadBotClient from '../Client'
import { table } from 'table'
import chalk from 'chalk'

const displayResult = (client: FadBotClient) => {
    let data = [
        [chalk.green.underline('No'), chalk.yellow.underline('Name'), chalk.rgb(255, 255, 255).underline('Command Count')],
    ]

    let i = 0

    for (let category of client.categories) {
        if (category === 'context') continue

        let numberOfCommands = client.commands.filter(c => c.category.toLowerCase() === category.toLowerCase()).size

        data.push([
            chalk.green(i.toString()),
            chalk.yellow(category.charAt(0).toUpperCase() + category.slice(1)),
            chalk.rgb(255, 255, 255)(numberOfCommands.toString())
        ])

        i++
    }

    console.log(table(data, {
        header: {
            content: chalk.rgb(250, 169, 70)('Command Categories'),
            alignment: 'center',
        },
        columns: {
            0: { alignment: 'center' },
            2: { alignment: 'center' }
        }
    }))
}

export default displayResult