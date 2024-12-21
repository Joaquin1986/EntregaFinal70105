const path = require('path');

const notFound404Views = (req, res, next) => {
    const errorPath = req._parsedOriginalUrl.path;
    const message = `⛔ Error 404: Sitio no encontrado (${errorPath})`;
    console.error(message);
    const title = "Sitio no encontrado 🔎";
    return res.render('notFound404', { title: title });
};

const notFound404 = (req, res, next) => {
    const errorPath = req._parsedOriginalUrl.path;
    const message = `⛔ Error 404: Sitio no encontrado (${errorPath})`;
    console.error(message);
    res.status(404).json({ message });
    next();
}

module.exports = { notFound404, notFound404Views };