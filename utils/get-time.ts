const getTimeFromMS = (milliseconds: number) => {
    let totalSeconds = (milliseconds / 1000);
    let days = Math.floor(totalSeconds / 86400)
    totalSeconds %= 86400
    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds % 60)

    return `D: \`${days}\`\nH:\`${hours}\`\nM: \`${minutes}\`\nS: \`${seconds}\``
}

export default getTimeFromMS