module.exports = {
    name: 'ready',
    run (client) {
        console.log(`\n\n${client.user.username} is ready!\n`)
    }
}