const { PetRepository } = require('../../repository/pet.repository');
const { UserRepository } = require('../../repository/user.repository');
const { AdoptionServices } = require('../../services/adoption.services');

const { createUserResponse, buildResponse } = require('../../utils/utils');

class AdoptionsController {

    static async getAdoptionById(req, res) {
        const { aid } = req.params;
        if (aid) {
            try {
                const adoption = await AdoptionServices.getAdoptionById(aid);
                if (adoption) {
                    const owner = await UserRepository.getUser(adoption.owner);
                    const pet = await PetRepository.getPet(adoption.pet);
                    return res.status(200).json(createUserResponse(200, "Adopción encontrada", req, { "code": adoption._id, "owner": owner, "pet": pet }));
                }
                return res.status(404).json(createUserResponse(404, "Adopción no encontrada", req, { "Error": `Adopción #${aid} no encontrada` }));
            } catch (error) {
                return res.status(500).json(createUserResponse(500, "Error interno", req, { "internalError:": error.message }));
            }
        } else {
            return res.status(400).json(createUserResponse(400, 'Petición incorrecta', req, {
                'Error':
                    'Petición incorrecta'
            }));
        }
    }

    static async getAdoptions(req, res) {
        let { limit, page } = req.query;
        limit = parseInt(limit);
        page = parseInt(page);
        let response = null;
        let criteria = { "deleted": false };
        if (!limit || limit < 1) limit = 10;
        if (!page || page < 1) page = 1;
        let options = { "limit": limit, "page": page };
        try {
            const adoptions = await AdoptionServices.getPaginatedAdoptions(criteria, options);
            response = buildResponse(adoptions, 'api', 'adoptions', null, null);
            return res.status(200).json(response);
        } catch (error) {
            response = {
                status: "error",
                payload: ['error'],
                totalPages: 0,
                prevPage: null,
                nextPage: null,
                page: 0,
                hasPrevPage: false,
                hasNextPage: false,
                prevLink: null,
                nextLink: null,
            };
            return res.status(500).json(response);
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
