module.exports.exceedsLimit = (num, minLimit, maxLimit) => {
    if (num < minLimit || num > maxLimit) return true
    return false
}