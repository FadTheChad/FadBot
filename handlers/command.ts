import FadBotClient from "../structure/Client";
import fs from "fs"
import ICommand from "../structure/interfaces/ICommand";

const handler = (client: FadBotClient) => {
    for (const folder of client.categories) {
        if (folder === 'context') continue

        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js') || file.endsWith('ts')) // <= what could this possibly mean!?!?!?!
        console.log(`\nSearching ${folder} commands...\n`)

        for (const file of commandFiles) {
            const req = require(`../commands/${folder}/${file}`)

            const command: ICommand = req.default

            client.commands.set(command.name, command)

            console.log(`\t${file} has been loaded!`)
        }
    }
}

export default handler