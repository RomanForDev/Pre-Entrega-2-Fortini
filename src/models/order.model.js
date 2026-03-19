import mongoose from "mongoose";

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true,
        index: true
    },
    price: {
        type: Number, 
        required: true,
    },
    quantity: Number,
})

export const cartModel = mongoose.model(cartCollection, cartSchema);