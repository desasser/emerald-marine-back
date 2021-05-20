const jwt=require('jsonwebtoken');

module.exports = {
    secret: 'emeraldmarine',
    authenticateMe: (req, secret) => {
        let token = false;
        if (!req.headers) {
            token = false
        }
        else if (!req.headers.authorization) {
            token = false;
        }
        else {
            token = req.headers.authorization.split(" ")[1];
        }
        let data = false;
        if (token) {
            data = jwt.verify(token, `${secret}`, (err, data) => {
                if (err) {
                    return false;
                } else {
                    return data
                }
            })
        }
        return data;
    }
}