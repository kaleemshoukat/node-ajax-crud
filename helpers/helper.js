const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.bcrypt_password = async (myPlaintextPassword)=> {
    return await bcrypt.hash(myPlaintextPassword, saltRounds)
}

exports.compare_password = async (myPlaintextPassword, hashedPassword)=> {
    return await bcrypt.compare(myPlaintextPassword, hashedPassword)
}

exports.randomStr = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}