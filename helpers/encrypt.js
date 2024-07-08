const bcryptjs = require('bcryptjs');

const encrypt = ( pass ) =>{

    const salt = bcryptjs.genSaltSync();
    pass = bcryptjs.hashSync( pass, salt );

    return pass;
}

module.exports = {
    encrypt
};