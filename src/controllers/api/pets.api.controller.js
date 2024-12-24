const { PetRepository } = require("../../repository/pet.repository");
const { createUserResponse } = require('../../utils/utils');

class PetsController {

    static async getPetById(req, res) {
        const { pid } = req.params;
        if (pid) {
            try {
                const pet = await PetRepository.getPet(pid);
                if (pet) return res.status(200).json(createUserResponse(200, "Mascota encontrada", req, { "pet": pet }));
                return res.status(404).json(createUserResponse(404, "Mascota no encontrada", req, { "⛔Error": `Mascota #${pid} no encontrada` }));
            } catch (error) {
                return res.status(500).json(createUserResponse(500, "Error interno", req, { "⛔Error interno:": error.message }));
            }
        } else {
            return res.status(400).json(createUserResponse(400, 'Petición incorrecta', req, {
                'Error':
                    'Petición incorrecta (faltan valores para crear el usuario)'
            }));
        }
    }

}

module.exports = { PetsController };