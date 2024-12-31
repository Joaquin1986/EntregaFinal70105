# Proyecto FINAL de Backend III - Coderhouse (Comisión 70105)

Proyecto Final de **Backend III** para **Comisión 70105** de **Coderhouse**

## Link a imagen de Docker en Dockerhub

[https://hub.docker.com/r/joaquinkulik/entregafinal70105](https://hub.docker.com/r/joaquinkulik/entregafinal70105)

## Descripción de la App

Esta APP cumple con los requisitos de la entrega final de **Backend III**: Documenación, Tests Funcionales e Imagen de Docker a Dockerhub, además de incorporar conceptos o temas vistos a lo largo de los cursos pasados de **Backend I** y **Backend II**. Esto se logra realizando una suerte de "merge" entre mi proyecto previo (eCommerce de productos) y algunas funcionalidades del proyecto de Adopción de Mascotas, que se plantea en este curso.
La base es de NodeJS, Express y MongoDB (con Mongoose), pero también se implementan vistas mediante Handlebars, registro y autenticación/login (JWT), productos en tiempo real con socket.IO, etc.

## Ejecución de la App

Luego de descargar o clonar el proyecto, se debe copiar o crear un archivo .env en la raíz del proyecto con el formato descripto en el archivo ".env.example", ubicado el la raíz del proyecto.

Posicionados en el directorio de la APP, se pueden ejecutar los siguientes comandos en una CLI (ya sea Powershell, Bash, etc.):

### `npm install`

Instala todas las dependencias necesarias para la ejecución del proyecto (node_modules).

### `npm start`

Este comando ejecuta la app en modo 'productivo'.
Por defecto, el puerto en el cual trabaja la app el 8080 pero puede ser modificado. En todo caso, puede abrirse la dirección [http://localhost:8080](http://localhost:8080) (o especificando el puerto modificado) para visualizar la app desde browser de elección (se recomienda Chrome). 

### `npm run dev`

Este comando ejecuta la app en modo 'desarrollo'. Es necesario contar con [nodemon](https://www.npmjs.com/package/nodemon) para ello.

## Componentes Necesarios (NPM Import)

La App necesita la importación/import (se recomienda [NPM](https://www.npmjs.com/)) de los siguientes componentes:

✔️ @faker-js/faker ([https://www.npmjs.com/package/@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker))<br>
✔️ bcrypt ([https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt))<br>
✔️ cookie-parser ([https://www.npmjs.com/package/cookie-parser](https://www.npmjs.com/package/cookie-parser))<br>
✔️ dotenv ([https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv))<br>
✔️ express ([https://www.npmjs.com/package/express](https://www.npmjs.com/package/express))<br>
✔️ express-handlebars ([https://www.npmjs.com/package/express-handlebars](https://www.npmjs.com/package/express-handlebars))<br>
✔️ jsonwebtoken ([https://npmjs.com/package/jsonwebtoken](https://npmjs.com/package/jsonwebtoken))<br>
✔️ mongoose ([https://www.npmjs.com/package/mongoose](https://www.npmjs.com/package/mongoose))<br>
✔️ mongoose-paginate-v2 ([https://www.npmjs.com/package/mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2))<br>
✔️ multer ([https://www.npmjs.com/package/mongoose](https://www.npmjs.com/package/multer))<br>
✔️ passport ([https://www.npmjs.com/package/passport](https://www.npmjs.com/package/passport))<br>
✔️ passport-jwt ([https://www.npmjs.com/package/passport-jwt](https://www.npmjs.com/package/passport-jwt))<br>
✔️ socket.io ([https://www.npmjs.com/package/socket.io](https://www.npmjs.com/package/socket.io))<br>
✔️ swagger-jsdoc ([https://www.npmjs.com/package/swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc))<br>
✔️ swagger-ui-express ([https://www.npmjs.com/package/swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express))<br>

## Estructura de la App

La App está desarrollada con la siguiente estructura para su mejor organización y fácil escalabilidad.

### Carpeta raíz `./`

✔️ '/app.js' - archivo inicial de la APP (definido en 'package.json')<br>
✔️ '/.docketignore' - archivos/carpetas que deben ignorarse para la imagen Docker<br>
✔️ '/.env' - archivo con la configuración de variables para DOTENV<br>
✔️ '/.env.example' - ejemplo de archivo de configuración de variables para DOTENV<br>
✔️ '/.gitignore' - archivos/carpetas que deben ignorarse al hacer un push a Github<br>
✔️ '/Dockerfile' - archivo con la configuración necesaria para la creación de imagen Docker<br>
✔️ '/package.json' - archivo 'package.json' de la APP con la configuración necesaria<br>
✔️ '/package-lock.json' - archivo 'package-lock.json' de la APP<br>
✔️ '/readme.md' - archivo README (el que estás leyendo en este momento🤓)<br>

### Carpeta `./public`

✔️ '/css' - carpeta destinada a almacenar los estilos que se utilizarán en las vistas presentadas al cliente<br>
✔️ '/img' - carpeta destinada a almacenar las thumbnails que se subirán por multer, imágenes que se presentan en las vistas al cliente, favicon, etc.<br>
✔️ '/js' - carpeta donde se encuentran los archivos JavaScript asociados a las vistas que se presentan y SocketIO del lado del cliente<br>

### Carpeta `./src`

✔️ '/controllers' - ubicación de los controllers (Api y Views)<br>
✔️ '/dao' - ubicación de los DAO<br>
✔️ '/dao/models' - ubicación de los modelos y esquemas de la BD<br>
✔️ '/db' - ubicación del archivo de conexión con la base de datos MongoD<br>
✔️ '/docs' - ubicación de la documentación con Swagger (Adoptions y Sessions/Users)<br>
✔️ '/dto' - ubicación de los DTO<br>
✔️ '/middleware' - ubicación de los Middleware<br>
✔️ '/passport' - ubicación de los archivos que implementan Passport<br>
✔️ '/repository' - ubicación de los Repository implementados<br>
✔️ '/routes' - ubicación de las rutas de la APP, tanto de la API como de las vistas<br>
✔️ '/server' - ubicación del archivo de configuración/conexión del servidor<br>
✔️ '/services' - ubicación de los archivos de Servicios de la APP<br>
✔️ '/socket' - ubicación del archivo de configuración/conexión del socket del lado del servidor<br>
✔️ '/test' - ubicación de los archivos de Test <br>
✔️ '/utils' - ubicación del archivo con código utilizado/reutilizado a lo largo de la APP<br>
✔️ '/views' - ubicación de los archivos de vistas implementadas mediante Handlebars<br>

## Estilos CSS en vistas (cliente)

Los estilos CSS asociados a las vistas de la App están configurados en el archivo 'styles.css' bajo la carpeta 'public/css' de la APP.