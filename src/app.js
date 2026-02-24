import express from 'express';
import path from 'path';

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Puerto iniciado en ${PORT}`);
})