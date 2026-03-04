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
        console.log(productos);
        res.json({status: 'success', payload: productos});
    } catch (error) {
        console.log(error) 
        res.status(500).json({status: 'error', msg:'Se ha producido un error al recuperar los datos de Productos.'});
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await productModel.findById(id);
        res.json({status: 'success', payload: producto})
    } catch (error) {
        res.status(500).json({status: 'Error', msg: 'No se encontró el id solicitado.'});
        console.log(error);
    } 
})

// Agregar un producto.
router.post('/', async (req, res) => {
    try {
        const {name, price, status, quantity, description} = req.body;
        const productoNuevo = await productModel.create({ name, price, status, quantity, description});
        res.json({status: 'success', payload: productoNuevo})
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
        res.json({status: "success", payload: `Eliminado el producto ${productoEliminado.name}`})
    } catch (error) {
        res.status(500).json({status: 'Error', msg: 'Error del servidor al eliminar el producto.'})
        console.log(error);
    }
    }
)

// Modificar un producto.

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {name, price, status, quantity, description} = req.body;
    try {
        const productoModificado = await productModel.findByIdAndUpdate(id, {name, price, status, quantity, description}, { returnDocument: 'after' });
        res.json({status: 'success', payload: `Modificado el objeto ${name}`})
    } catch (error) {
        res.status(500).json({status: 'Error', msg: 'Error del servidor al modificar el producto.'})
        console.log(error);
    }
})

export default router;