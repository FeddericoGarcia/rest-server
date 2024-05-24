const { userSearchDB } = require('../helpers/searchValidators/userSearch');
const { User, Category, Product } = require('../models');

const allowedCollections = [
    "user",
    "category",
    "product"
]

const search = ( req, res ) => {

    const { collection, term } = req.params

    switch ( collection ) {
        case "user":
            userSearchDB( term, res );
            break;
        case "category":
            
            break;
        case "product":
            
            break;
    
        default:
            res.status(500).json({
                msg: "No search has been performed"
            })
    }

}

// const userSearchDB = async ( term = '', res ) =>{

//     const isMongoID = ObjetId.isValid( term );
    
//     if ( isMongoID ) {
//         const user = User.findById( term );
//         return res.status(200).json({
//             results: ( term ) ? [term] : []
//         });
//     }

// }

module.exports = {
    search,
    userSearchDB
}