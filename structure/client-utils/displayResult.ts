import FadBotClient from '../Client'
import { table } from 'table'
import chalk from 'chalk'

const displayResult = (client: FadBotClient) => {
    // Command Table
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

    // Event Table
    let data2 = [
        [chalk.green.underline('No'), chalk.yellow.underline('Name'), chalk.rgb(255, 255, 255).underline('Once')],
    ]

    let i2 = 0

    for (let [eventName, eventData] of client.events) {
        data2.push([
            chalk.green(i2.toString()),
            chalk.yellow(eventName),
            chalk.rgb(255, 255, 255)((eventData.once ?? false).toString())
        ])

        i2++
    }

    console.log(table(data2, {
        header: {
            content: chalk.rgb(5, 247, 82)('Events'),
            alignment: 'center',
        },
        columns: {
            0: { alignment: 'center' },
            2: { alignment: 'center' }
        }
    }))
}

export default displayResult