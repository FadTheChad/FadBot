const countries = require('../../utils/countries.json')
const { fbEmbed } = require("../../utils/fbEmbed-utils");

module.exports = {
    name: 'countries',
    description: 'A guessing game! (in development)',
    category: 'fun',
    async run(client, message, args) {
        const country = countries[Math.floor(Math.random() * countries.length)]

        message.channel.send(`What country is this? :flag_${country.code}:`)

        const filter = m => m.author.id === message.author.id

        await message.channel.awaitMessages({
            filter,
            max: 1,
            time: 10000,
            errors: ['time']
        })
            .then(answer => {
                if (typeof country.name === 'string') country.name = [country.name]
                if (country.name.includes(answer.first().content.toLowerCase())) {
                    const cEmbed = fbEmbed('success', 'Correct Answer!')
                        .addField('Your Answer', answer.first().content.toLowerCase())
                        .addField(
                            `Correct Answer${country.name.length > 1 ? 's' : ''}`,
                            country.name.map(c => '`' + c.charAt(0).toUpperCase() + c.slice(1) + '`').join(', ')
                        )

                    return message.reply({ embeds: [cEmbed] })
                }
                const icEmbed = fbEmbed('error', 'Incorrect Answer!')
                    .addField('Your Answer', answer.first().content.toLowerCase())
                    .addField(
                        `Correct Answer${country.name.length > 1 ? 's' : ''}`,
                        country.name.map(c => '`' + c.charAt(0).toUpperCase() + c.slice(1) + '`').join(', ')
                    )

                return message.reply({ embeds: [icEmbed] })
            })
            .catch(() => {
                const timeEmbed = fbEmbed('error', 'Out Of Time!', 'You forgor (:skull:) to give the answer!')

                return message.channel.send({ embeds: [timeEmbed] })
            })
    }
}