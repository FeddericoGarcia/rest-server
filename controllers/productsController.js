const { Product } = require('../models');

const pathGet = async ( req, res ) => {

    try {
        const { state = true } = req.query;
        const [ total_docs, product] = await Promise.all([
            Product.countDocuments({state}),
            Product.find({state})
                .populate('user', 'name')
        ]);
    
        res.status(201).json({
            total_docs,
            product
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong in controller'
        });
        
    }
}
const pathGetID = async ( req, res ) => {

}
const pathPost = async ( req, res ) => {
    
    try {
        const name = req.body.name.toUpperCase();
        const { id } = req.body

        const productDB = await Product.findById( id );

        if ( productDB ){
            res.status(400).json({
                msg: `The product ${ productDB.name } is already registered`
            });
        }

        const data = {
            name,
            user: req.user._id
        }

        const product = new Product( data );

        await product.save();

        res.status(200).json({
            product
        });

    } catch (err) {
        console.log(err)
        res.status(403).json({
            msg: 'Something went wrong in controller'
        });
    }

}
const pathPut = async ( req, res ) => {

}
const pathDelete = async ( req, res ) => {

}

module.exports = {
    pathGet,
    pathGetID,
    pathPost,
    pathPut,
    pathDelete,
}
