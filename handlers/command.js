const fs = require('fs')

module.exports = (client) => {
    for (const folder of client.categories) {
        if (folder === 'context') continue
        
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js') || file.endsWith('ts')) // <= what could this possibly mean!?!?!?!
        console.log(`\nSearching ${folder} commands...\n`)
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`)
            client.commands.set(command.name, command)
            console.log(`\t${file} has been loaded!`)
        }
    }
}