import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true
    },
    price: {
        type: Number, 
        required: true
    },
    status: Boolean,
    quantity: Number,
    description: {
        type: String, 
        required: true
    }
})

export const productModel = mongoose.model(productCollection, productSchema);