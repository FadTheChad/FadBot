// :tro:
const { sleep } = require("../../utils/hack-util.js");

module.exports = {
    name: 'hack',
    description: 'hacks someone',
    aliases: ["hack", "hacks", "nasa", "fbi"],
    category: 'misc',
    async run(client, message, args) {
        const hackMessage = message.reply("Hacking...");
        hackMessage.edit("◜ ");
        await sleep(750);
        hackMessage.edit(" ◝");
        await sleep(750);
        hackMessage.edit(" ◞");
        await sleep(750);
        hackMessage.edit("◟ ");
        await sleep(750);
        hackMessage.edit(":tro:");
    }
}