import { MongoClient } from "mongodb";

let db;

export const connectMongo = async (uri, dbName) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName)
        console.log('Conectado a MongoDB con éxito');
        
    } catch (error) {
        console.log('Conección a MongoDB fallida');
        console.log(error);
    }
}

export const getDB = () => {
    return db
}