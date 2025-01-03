const { Server } = require('socket.io');
const { ProductServices } = require('../services/product.services');

/* Tanto la baja como el cambio de status de los productos se realizan mediante SocketIO. Sin embargo, 
   la creación de nuevos productos se realiza mediante fetch (método POST) hacia el Endpoint/API
   de Productos a efectos de optimizar el rendimiento en la subida de imágenes (thumbnails) */

const initSocket = async (httpServer) => {
    const socketServer = new Server(httpServer);
    socketServer.on('connection', (socketClient) => {
        console.log(`Cliente conectado exitosamente 👍: id #${socketClient.id}`);
        socketClient.on('status', async (product, status) => {
            const result = await ProductServices.productStatus(product, status);
            socketServer.emit('status', product, result, status, socketClient.id);
        });
        socketClient.on('delete', async (product) => {
            const result = await ProductServices.deleteProduct(product)
            socketServer.emit('delete', product, result);
        });
        socketClient.on('newProduct', async (productId) => {
            const newProduct = await ProductServices.getProductById(productId);
            socketServer.emit('newProduct', newProduct, socketClient.id);
        });
    });
};

module.exports = initSocket;