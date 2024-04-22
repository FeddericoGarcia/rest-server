const Role = require('../models/role');
const User = require('../models/user');

const verifyRole = async ( role = '' ) =>{

    const roleExists = await Role.findOne({ role });
    if ( !roleExists ){
        throw new Error(`This role '${ role }' is not valid, check it`);
    }

}

const verifyEmail = async ( email = '' ) => {

    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error(`This email '${ email }' is already registered, check it`);
    };

}

const verifyID = async ( id ) => {

    const IDExists = await User.findById( id );
    if ( !IDExists ) {
        throw new Error(`This ID ${ id } not exists, check it`);
    };

}

module.exports = {
    verifyRole,
    verifyEmail,
    verifyID
}