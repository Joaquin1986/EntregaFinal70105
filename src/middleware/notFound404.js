const path = require('path');

const notFound404 = async (req, res, next) => {
    const errorPath = path.join(__dirname, req.originalUrl);
    const message = `⛔ Error 404: Sitio no encontrado (${errorPath})`;
    console.error(message);
    res.status(404).json({ message });
    next();
}

module.exports = notFound404;