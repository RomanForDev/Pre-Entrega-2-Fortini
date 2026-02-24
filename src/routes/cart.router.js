import express from 'express';

const router = express.Router();

router.post('/:id', (req,res) => {
    const { id } = req.params;
    const productoCarro = data.find(item => item.id == id);
    console.log(productoCarro);
    fs.writeFileSync('./data/cart.json', JSON.stringify(productoCarro), 'utf-8');
    res.json({ status: 'success', dataProvide: {id}});
})


//Ver carrito en navegador.

router.get('/', (req, res) => {
    res.send(`<h3>Su carrito de Compras es : </h3>`)
})

export default router