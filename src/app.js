import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import path from 'path';
import handlebars from 'express-handlebars';
import __dirname from './utils/dirname.js'
import { connectMongo, getDB } from './db/mongo.js';

const app = express();
const PORT = 8080;
const URI_DB = 'mongodb://localhost:27017/';
const DB_NAME = '81295';

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', '..', 'public'))); //Esto se necesita porque la carpeta public esta por fuera de src!

//// Conexión a MongoDB ////

await connectMongo(URI_DB, DB_NAME);

///Configuración handlebars////

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '..', 'views'));

//// Endpoints ////

app.use('/home', (req, res) => {
    let data = {
        message: 'Bienvenido!',
        title: "Bienvenidos"
    }
    res.render('index', data)
});

app.use('/api/products', productsRouter);

app.use('/api/cart', cartRouter);

///////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Puerto iniciado en ${PORT}`);
})