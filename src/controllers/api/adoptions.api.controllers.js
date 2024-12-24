const { AdoptionServices } = require('../../services/adoption.services');
const { createUserResponse } = require('../../utils/utils');

class AdoptionsController {

    static async getAdoptionById(req, res) {
        const { aid } = req.params;
        if (aid) {
            try {
                const adoption = await AdoptionServices.getAdoptionById(aid);
                if (adoption) return res.status(200).json(createUserResponse(200, "Adopción encontrada", req, { "adoption": adoption }));
                return res.status(404).json(createUserResponse(404, "Adopción no encontrada", req, { "⛔Error": `Adopción #${aid} no encontrada` }));
            } catch (error) {
                return res.status(500).json(createUserResponse(500, "Error interno", req, { "⛔Error interno:": error.message }));
            }
        } else {
            return res.status(400).json(createUserResponse(400, 'Petición incorrecta', req, {
                'Error':
                    'Petición incorrecta'
            }));
        }
    }

    static async getAdoptions(req, res) {
        try {
            const adoptions = await AdoptionServices.getAdoptions();
            return res.status(200).json(createUserResponse(200, "Lista de Adopciones", req, { "adoptions": adoptions }));
        } catch (error) {
            return res.status(500).json(createUserResponse(500, "Error interno", req, { "⛔Error interno:": error.message }));
        }
    }

    static async createAdoption(req, res) {
        try {
            const { oid, pid } = req.params
            if (!oid || !pid)
                return res.status(400).json(createUserResponse(400, 'Petición incorrecta', req, {
                    'Error':
                        'Petición incorrecta'
                }));
            const result = await AdoptionServices.createAdoption(oid, pid);
            return res.status(result.code).json(createUserResponse(result.code, result.description, req, result.payload));

        } catch (error) {
            return res.status(500).json(createUserResponse(500, 'Error interno', req, { 'internalError:': error.message }));
        }
    }
}

module.exports = { AdoptionsController }
