const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
    name:{
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    state:{
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

module.exports = model("Category", CategorySchema);