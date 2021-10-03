const Schema = require('../../schemas/User')

module.exports.setBlacklisted = (userId, bool) => {
    Schema.findOne({ _id: userId }, async (err, data) => {
        if (err) throw err

        if (data) {
            data.blacklisted = bool

            data.save()
        } else {
            data = new Schema({
                _id: userId,
                blacklisted: bool
            })

            data.save()
        }
    })
}

module.exports.isBlacklisted = async (userId) => {
    const result = await Schema.findOne({ _id: userId })

    if (!result) return false

    return result?.blacklisted
}