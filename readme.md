## Chat
Este proyecto es un chat en tiempo real desarrollado con Socket.IO y Express. Permite a los usuarios conectarse y comunicarse entre sí.

## Configuración del Proyecto
1. Iniciar un proyecto con el comando `npm init`en la raíz del proyecto.
2. Instalar las dependencias con el comando `npm install`:
```bash
npm install socket.io
npm install socket.io-client
npm install express
npm install nodemon
```

3. Agrega el comando `dev` en el archivo package.json
```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js"
  },
```

## Ejecución del Servidor
Desde la raíz del proyecto, moverse al directorio server `cd server/`
Para ejecutar el servidor, utilizar el comando `npm run dev`. Esto iniciará el servidor en modo desarrollo en el puerto 3000.

## Ejecución del Cliente
Desde la raíz del proyecto, moverse al directorio del Cliente `cd front_chat/`
Para ejecutar el Cliente WEB, utilizar el comando `npm start`. Esto iniciará en el puerto 3001, el cliente web listo para utilizar el chat .
* http://localhost:3000
