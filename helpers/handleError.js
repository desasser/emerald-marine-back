module.exports = {
    handleError: (err) => {
        err ? res.status(500).send(`The server encountered the following error: ${err}`) : res.status(200).send('Login successful.')
    }
}