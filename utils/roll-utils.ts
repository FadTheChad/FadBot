const exceedsLimit = (num: number, minLimit: number, maxLimit: number): boolean => {
    return num < minLimit || num > maxLimit;
}

export default exceedsLimit