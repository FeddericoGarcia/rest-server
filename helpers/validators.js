const { Role, User, Category, Product } = require('../models');

const verifyRole = async ( role = '' ) =>{

    const roleExists = await Role.findOne({ role });
    if ( !roleExists ){
        throw new Error(`This role '${ role.toUpperCase() }' is not valid, check it`);
    }

}

const verifyEmail = async ( email = '' ) => {

    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error(`This email '${ email.toUpperCase() }' is already registered, check it`);
    };

}

const verifyID = async ( id ) => {

    const IDExists = await User.findById( id );
    if ( !IDExists ) {
        throw new Error(`This ID ${ id } not exists, check it`);
    };

}

const verifyCategory = async ( id ) => {

    const IDExists = await Category.findById( id );
    if ( !IDExists ) {
        throw new Error(`This Category ${ id } not exists, check it`);
    };

}

const verifyProduct = async ( id ) => {

    const IDExists = await Product.findById( id );
    if ( !IDExists ) {
        throw new Error(`This product ${ id } not exists, check it`);
    };

}

module.exports = {
    verifyRole,
    verifyEmail,
    verifyID,
    verifyCategory,
    verifyProduct
}