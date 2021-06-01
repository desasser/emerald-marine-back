module.exports = {
    handle500Error: (err) => {
        return `The server encountered the following error: ${err}`
    }
}