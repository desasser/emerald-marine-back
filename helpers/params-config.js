const { v4: uuidv4 } = require('uuid');

const params = fileName => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];
    const imageParams = {
        Bucket: 'user-images-72a4be97-dc8f-499e-8fe0-ec69030da4f5',
        Key: `${uuidv4()}.${fileType}`,
        Body: fileName.buffer
    };
    return imageParams;
};

module.exports = params;