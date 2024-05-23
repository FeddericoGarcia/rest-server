const { Product, User } = require('../models');

const pathGet = async ( req, res ) => {

    try {
        const { limit = 5, from = 0, state = true} = req.query;
        const [ total_docs, products ] = await Promise.all([
            Product.countDocuments({state}),
            Product.find({state})
                .populate("user", "name")
                .populate("category", "name")
                .skip( Number(from) )
                .limit( Number(limit) )
        ]);
    
        res.status(201).json({
            total_docs,
            products
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
// TODO: Solucionar el match con DB ya que trae null (linea 50)
const pathPost = async ( req, res ) => {
    
    try {
        const { user, state, ...body } = req.body;
        const productDB = await Product.findOne({ name: req.body.name });
        
        console.log("producto en database", productDB)
        console.log("producto en database", body.name)
        
        if ( productDB ){
            res.status(400).json({
                msg: `The product ${ productDB.name } is already registered`
            });
        }
        
        data = {
            ...body,
            name: req.body.name.toUpperCase(),
            user: req.user._id,
        }

        const product = new Product( data );

        await product.save();

        res.status(201).json({
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

        if ( data.name ){
            data.name = data.name.toUpperCase();  
        }
        
        data.user = req.user._id

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
// TODO: Solucionar "state" ya que es boolean e impacta como string en DB
const pathDelete = async ( req, res ) => {

    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true });

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
