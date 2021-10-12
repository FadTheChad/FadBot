module.exports = {
    sleep: (waitTimeInMs) =>
     new Promise(resolve => 
        setTimeout(resolve, waitTimeInMs)),
}