const { PetRepository } = require("../repository/pet.repository");

class PetsControllers {

    static async getPetById(req, res) {
        const { pid } = req.params;
        if (pid) {
            try {
                const pet = await PetRepository.getPet(pid);
                if (pet) return res.status(200).json({ "pet": pet });
                return res.status(404).json({ "⛔Error": `Mascota #${pid} no encontrada` });
            } catch (error) {
                res.status(500).json({ "⛔Error interno:": error.message });
            }
        } else {
            res.status(400).json({ "⛔Error:": "Request no válido" });
        }
    }

}

module.exports = { PetsControllers };