const { Role, User, Category, Product } = require('../models');


/**** ROLE ***/

const verifyRole = async ( role = '' ) =>{

    const roleExists = await Role.findOne({ role });
    if ( !roleExists ){
        throw new Error(`This role '${ role.toUpperCase() }' is not valid, check it`);
    }

}

/**** USER ***/

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

/**** CATEGORY ***/

const verifyCategory = async ( id ) => {

    const IDExists = await Category.findById( id );
    if ( !IDExists ) {
        throw new Error(`This Category ${ id } not exists, check it`);
    };

}

/**** PRODUCTS ***/

const verifyProduct = async ( id ) => {

    const IDExists = await Product.findById( id );
    if ( !IDExists ) {
        throw new Error(`This product ${ id } not exists, check it`);
    };

}

/**** ALLOWED COLLECTIONS  ***/

const allowedCollections = ( collection = '', collections = [] ) => {

    const include = collections.includes( collection );
    if (!include) {
        throw new Error(`The collection ${ collection } is not allowed, the corrects ones are ${ collections }`)
    }
    return true;

}



module.exports = {
    verifyRole,
    verifyEmail,
    verifyID,
    verifyCategory,
    verifyProduct,
    allowedCollections
}