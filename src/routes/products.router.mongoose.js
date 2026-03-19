import express from 'express';
import { getDB } from '../db/mongo.js';
import { productManager } from '../utils/productManager.js';

import { Router } from 'express';
import { productModel } from '../models/products.model.js';

const router = Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

const coleccion = () => getDB().collection('products');

router.get('/', async (req, res) => {
    try {
        const productos = await productModel.find();
        let element = productManager(productos);
        let data = {
            message: 'Productos!',
            db: element
        }
        res.render('realTimeProducts', data);
        // res.json({status: 'success', payload: productos});
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'error', msg:'Se ha producido un error al recuperar los datos de Productos.'});
    }
})

// Agregar un producto.
router.post('/', async (req, res) => {
    try {
        const {name, price, status, quantity, description} = req.body;
        const productoNuevo = await productModel.create({ name, price, status, quantity, description});
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

// // Eliminar un producto.

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await productModel.findByIdAndDelete(id);
        const io = req.app.get('io');
        if (io) io.emit('productsUpdated', productoEliminado);
        return res.status(200).json({
            status: "success",
            payload: `Eliminado el producto ${productoEliminado?.name ?? id}`
        });
    } catch (error) {
        res.status(500).json({status: 'Error', msg: 'Error del servidor al eliminar el producto.'})
        console.log(error);
    }
});

// Modificar un producto.

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {name, price, status, quantity, description} = req.body;
    try {
        const productoModificado = await productModel.findByIdAndUpdate(id, {name, price, status, quantity, description});
        const io = req.app.get('io');
        if (io) io.emit('productsUpdated', productoModificado);
        return res.status(200).json({
            status: "success",
            payload: `Modificado el producto ${productoModificado?.name ?? id}`
        });
        // res.json({status: 'success', payload: `Modificado el objeto ${name}`})
    } catch (error) {
        res.status(500).json({status: 'Error', msg: 'Error del servidor al modificar el producto.'})
        console.log(error);
    }
})

router.get('/nochoco', async (req, res) => {
    const nochoco = false;
    try {
        const search = await productModel.aggregate([{
            $match: {status: nochoco}
        }])
        res.json({status: 'success', payload: search})
    } catch (error) {
        res.status(500).json({status: 'Error', msg: 'Error al encontrar los productos.'})
        console.log(error);
    }
})

export default router;