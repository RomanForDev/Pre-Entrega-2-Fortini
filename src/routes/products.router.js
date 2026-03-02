import express from 'express';
import { getDB } from '../db/mongo.js';
import { productManager } from '../utils/productManager.js';

const router = express.Router();

const coleccion = () => getDB().collection('products');

router.get('/', async (req, res) => {
    const productos = await coleccion().find().toArray();
    let element = productManager(productos)
    let data = {
        message: 'Productos!',
        db: element
    }
    console.log(data);
    res.render('realTimeProducts', data);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const productos = await coleccion().find().toArray();
    const producto = productos.find(item => item._id == id);
    res.json(producto);
})

// // Agregar un producto.

// router.post('/', (req, res) => {
//     const {name, price, status, quantity} = req.body;

//     const id =  crypto.randomUUID();
//     data.push({
//         id,
//         name,
//         price, 
//         status, 
//         quantity
//     })
//     //Persistencia sólo desde Thunder.
//     let datos = JSON.stringify(data, null, 2);
//     fs.writeFileSync('./data/data2.json', datos, 'utf-8');
//     console.log(datos);
//     res.json({ status: 'success', dataProvide: {id}})
// })

// // Eliminar un producto.

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     const index = data.findIndex(item => item.id == id);
//     if(index != -1){
//         data.splice(index, 1)
//         console.log(data);
//         fs.writeFileSync('./data/data2.json', JSON.stringify(data, null, 2), 'utf-8')
//         res.json({status: "success"})
//     };
// })

export default router;