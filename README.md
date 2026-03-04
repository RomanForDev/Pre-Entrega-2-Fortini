Consigna
Configurar nuestro proyecto para que trabaje con Handlebars y websocket.
Aspectos a incluir
Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.
Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento
Sugerencias
Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, Se cree un formulario simple en la vista realTimeProducts.handlebars. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.
Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?

```bash
npm i :
    express
    express-handlebars
    mongodb
    nodemon
    tailwindcss @tailwindcss/cli
    socket.io
    mongoose
```

RESTA:

- Vistas de cards para products
- Vista de cart
- Estilos para products y cart
- Conectar a mongodbAtlas.

Ejecutar tailwind cli:
npx @tailwindcss/cli -i ./public/css/style.css -o ./public/css/output.css --watch
