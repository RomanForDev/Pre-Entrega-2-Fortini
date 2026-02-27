import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import path from 'path';
import handlebars from 'express-handlebars';

const app = express();
const PORT = 8080;
// app.use(express.json());

app.use('/home', express.static('public'));

// app.use('/home', (req, res) => {
//     res.render('./src/public/index.html')
// }) //Acá hay que poner handlebars seguramente.

app.engine('handlebars', handlebars.engine());
app.set('views', '/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);

app.use('/api/cart', cartRouter);

///////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Puerto iniciado en ${PORT}`);
})