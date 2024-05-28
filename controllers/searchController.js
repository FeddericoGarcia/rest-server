const { ObjectId } = require('mongoose').Types;

// const { userSearchDB } = require('../helpers/searchValidators/userSearch');
const { User, Category, Product } = require('../models');

const allowedCollections = [
    "user",
    "category",
    "product"
]

const search = ( req, res ) => {

    const { collection, term } = req.params

    switch ( collection ) {
        case "user": userSearch( term, res ); break;
        case "category": categorySearch( term, res ); break;
        case "product": productSearch( term, res ); break;
        default:
            res.status(500).json({
                msg: "No search has been performed"
            })
    }

}

const userSearch = async ( term = '', res ) =>{

   try {
     const isMongoID = ObjectId.isValid( term );
     if ( isMongoID ) {
         const user = await User.findById( term );
         return res.status(200).json({
             results: ( user ) ? [user] : []
         });
     } 
 
     const regex = new RegExp( term, 'i' );
     const [total_docs, users] = await Promise.all([
         User.countDocuments({ name: regex, state: true }),
         User.find({
             $or: [
                 { name: regex },
                 { email: regex }
             ],
             $and: [
                 { state: true }
             ]
         })
     ])
     
     res.status(200).json({
         "total documents": total_docs,
         results: users
     });
   } catch (error) {
        console.log(error)
        return res.status(403).json({
            msg: 'Something went wrong in controller'
        });
   }

}

const categorySearch = async ( term = '', res ) =>{

   try {
    const isMongoID = ObjectId.isValid( term );
    if ( isMongoID ) {
        const category = await Category.findById( term );
        return res.status(200).json({
            results: ( category ) ? [category] : []
        });
    } 
    
     const regex = new RegExp( term, 'i' );
     const [ total_docs, categories ] = await Promise.all([
         Category.countDocuments({ name: regex, state: true }),
         Category.find({ name: regex, state: true })
     ])
 
     res.status(200).json({
         "total documents": total_docs,
         results: categories
     });
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            msg: 'Something went wrong in controller'
        });
   }
    

}

const productSearch = async ( term = '', res ) =>{

    try {
        const isMongoID = ObjectId.isValid( term );
        if ( isMongoID ) {
            const product = await Product.findById( term )
                                    .populate('category', 'name')
                                    .populate('user', 'name');
            return res.status(200).json({
                results: ( product ) ? [product] : []
            });
        } 

        const regex = new RegExp( term, 'i' );
        const [ total_docs, products ] = await Promise.all([
            Product.countDocuments({ name: regex }),
            Product.find({ name: regex })
                    .populate('category', 'name')
                    .populate('user', 'name')
        ])
    
        res.status(200).json({
            "total documents": total_docs,
            results: products
        });
       } catch (error) {
           console.log(error)
           return res.status(403).json({
               msg: 'Something went wrong in controller'
           });
      }
    

}

module.exports = {
    search
}