const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.bcrypt_password = async (myPlaintextPassword)=> {
    const salt = await bcrypt.genSalt(saltRounds);
    await bcrypt.hash(myPlaintextPassword, salt).then(result=>{
        return result
    }).catch(error =>{
        return error
    })
}