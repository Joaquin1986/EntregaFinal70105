const errorHandler = async (error, req, res, next) => {
    const message = `⛔ Petición incorrecta: ${error.message}`;
    console.error(message);
    res.status(400).json({ message });
    next();
}

module.exports = errorHandler;