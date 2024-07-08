const {Schema, model} = require('mongoose');

const ProductsSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    description: {
        type: String,
    },
    price:{
        type: Number,
        default: 0,
    },
    state:{
        type: Boolean,
        required: true,
        default: true
    },
    avaliable: {
        type: Boolean,
        default: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    img:{
        type: String,
    }
})

ProductsSchema.methods.toJSON = function (){
    const { __v, state, ...data } = this.toObject();
    return data
}

module.exports = model('Products', ProductsSchema);