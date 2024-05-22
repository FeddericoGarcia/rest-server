const { Product, Category } = require('../models');

//TODO
const pathGet = async ( req, res ) => {

    try {
        const { state = true } = req.query;
        const [ total_docs, product] = await Promise.all([
            Product.countDocuments({state}),
            Product.find({state})
                // .populate('user', 'name')
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

    try {
        const { id } = req.params;
        const product = await Product.findById( id );

        res.status(200).json({
            product
        })

    } catch (error) {
        console.log(error)
        res.status(403).json({
            msg: 'Something went wrong in controller'
        });
    }
}
// TODO
const pathPost = async ( req, res ) => {
    
    try {
        const name = req.body.name.toUpperCase();

        const productDB = await Product.findOne({ name });

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

    try {
        const { id } = req.params;
        const { user, state, ...data } = req.body;

        data.name = data.name.toUpperCase();  
    
        const product = await Product.findByIdAndUpdate(id, data, { new: true})
        
        res.status(201).json({
            msg: `The product ${ product.name } is update`,
            product
        });

    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong in controller'
        });
    }
}
// SOLUCIONAR EL CAMBIO DE ESTADO YA QUE ES BOOLEANO Y QUEDA COMO STRING EN MONGODB
const pathDelete = async ( req, res ) => {

    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { state: false});

        if( !product.state ){
            res.status(401).json({
                msg: `The product ${ product.name } is inactive, status in false`
            });
        }

        res.status(201).json({
            msg: 'product has been deleted',
            product
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong in controller'
        });
    }
}

module.exports = {
    pathGet,
    pathGetID,
    pathPost,
    pathPut,
    pathDelete,
}
