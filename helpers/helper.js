const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.bcrypt_password = async (myPlaintextPassword)=> {
    return await bcrypt.hash(myPlaintextPassword, saltRounds)
}

exports.compare_password = async (myPlaintextPassword, hashedPassword)=> {
    return await bcrypt.compare(myPlaintextPassword, hashedPassword)
}
