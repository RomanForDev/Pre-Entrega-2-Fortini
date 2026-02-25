import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import path from 'path';

const app = express();
const PORT = 8080;
// app.use(express.json());

app.use('/home', express.static('public'));

// app.use('/home', (req, res) => {
//     res.render('./src/public/index.html')
// }) //Acá hay que poner handlebars seguramente.

app.use('/api/products', productsRouter);

app.use('/api/cart', cartRouter);

///////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Puerto iniciado en ${PORT}`);
})