import chalk from 'chalk'
import { Client } from 'discord.js'
import mongoose, { ConnectOptions } from 'mongoose'

let checkCount = -1

const check = (message: any) => {
    checkCount++
    return console.log(`\n[${chalk.rgb(66, 215, 245)(checkCount.toString())}] ` + chalk.rgb(66, 215, 245)(message))
}

const success = (message: any) => console.log(chalk.rgb(0, 255, 0)('\t✓ ' + message))
const err = (message: any) => {
    console.log(chalk.rgb(255, 0, 0)('\t✗ ' + message))
    process.exit(1)
}

let verifyResult = async () => {

    // Checks if node version is v16 or above
    check('Checking node version...')

    if (parseInt(process.version.split('.')[0].split('v')[1]) >= 16) success('Node version is 16.x.x')
    else err('Update node version to 16.x.x!')

    // Checks config.json
    check('Checking config file...')

    // @ts-ignore
    let configReq = await import('../config.json').catch(() => err('Config file not found'))
    const config = configReq.default

    for (let prop of ['token', 'prefix', 'devs', 'guildId', 'clientId', 'mongoURI']) {
        if (!config[prop as keyof typeof config]) err(
            `Property ${chalk.bgRgb(255, 0, 0).rgb(255, 255, 255)(prop)} not found!`
        )
        else success(prop + ' detected!')
    }

    // Checks if bot token actually works
    check('Validating bot token...')
    new Client({ intents: [] }).login(config.token).catch(() => {
        return err('The bot token in config.json seems to be invalid!')
    })
    success('Bot token is valid!')

    // Checks if mongoURI actually works
    check('Validating mongo connection string...')
    mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).catch(() => {
        return err('MongoDB URI in config.json seems to be invalid!')
    })
    success('MongoDB URI is valid!')
}

verifyResult().then(() => {
    console.log(
        chalk.yellow(
            '\nif you got this far and have all the required dependencies, this means that everything seems good to go! Have fun working on '
        ) + chalk.bgYellow.rgb(0, 0, 0)('FadBot') + chalk.yellow(' and ') + chalk.bgYellow.rgb(0, 0, 0)('Happy Coding!')
    )
    process.exit(0)
})