const { ObjectId } = require('mongoose').Types;
const { User } = require('../../models');

const userSearchDB = async ( term = '', res ) =>{

    const isMongoID = ObjectId.isValid( term );
    if ( isMongoID ) {
        const user = await User.findById( term );
        res.status(200).json({
            results: ( user ) ? [user] : []
        });
    }
    // userByMongoId(term, res);
    // userByName(term, res);
}

// const userByMongoId = async ( term, res ) => {


// }
// ***** TODO ******

// const userByName = async ( term, res ) => {

//     if ( term ) {
//         const user = await User.findOne(term);
//         return res.status(200).json({
//             results: ( user ) ? [user] : []
//         });
//     }

// }

module.exports = {
    userSearchDB
}