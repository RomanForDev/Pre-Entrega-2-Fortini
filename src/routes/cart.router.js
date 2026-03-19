import express from 'express';
import { getDB } from '../db/mongo.js';
import { productManager } from '../utils/productManager.js';

import { Router } from 'express';
import { cartModel } from '../models/order.model.js';

const router = Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

const coleccion = () => getDB().collection('products');

router.get('/', async (req, res) => {
    try {
        const productos = await cartModel.find();
        let element = productManager(productos);
        let data = {
            message: 'Su carrito!',
            db: element
        }
        // res.render('cart', data);
        res.json({status: 'success', payload: productos});
    } catch (error) {
        console.log(error) 
        res.status(500).json({status: 'error', msg:'Se ha producido un error al recuperar los datos de Productos.'});
    }
})


router.post('/', async (req, res) => {
    try {
        const {name, price, status, quantity, description} = req.body;
        const productoNuevo = await cartModel.create({ name, price, quantity });
        // res.json({status: 'success', payload: productoNuevo})
        const io = req.app.get('io');
        if (io) io.emit('productsUpdated', productoNuevo)
        return res.status(200).json({
            status: "success",
            payload: `Añadido el producto ${productoNuevo?.name ?? id}`
        });
    } catch (error) {
        res.status(500).json({status: 'Error', msg: 'Error del servidor al crear el producto.'})
        console.log(error);
    }
})

export default router