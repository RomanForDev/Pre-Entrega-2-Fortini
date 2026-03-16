import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import path from 'path';
import handlebars from 'express-handlebars';
import __dirname from './utils/dirname.js'
import { connectMongo, getDB } from './db/mongo.js';
import { Server } from 'socket.io'; 

////Para uso con Mongoose////

import mongoose from 'mongoose';
import productsRouterMongoose from './routes/products.router.mongoose.js';
const URI_DB_MONGOOSE = "";
mongoose.connect(URI_DB_MONGOOSE).then(() => {
    console.log('Conectado con éxito a MongoDBAtlas.');   
}).catch(error => {
    console.log('No se ha podido conectar con MongoDBAtlas.', error);
})
////////////////////////////////

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', '..', 'public'))); //Esto se necesita porque la carpeta public esta por fuera de src!

//// Conexión a MongoDB local ////

// const URI_DB = 'mongodb://localhost:27017/';
// const DB_NAME = '81295';
// await connectMongo(URI_DB, DB_NAME);

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

app.use('/api/products', productsRouterMongoose);

app.use('/api/cart', cartRouter);

///////////////////////////////////////////////////////////////
const httpServer = app.listen(PORT, () => {
    console.log(`Puerto iniciado en ${PORT}`);
})

const io = new Server(httpServer);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado con el id ' + socket.id);
});

app.set('io', io);