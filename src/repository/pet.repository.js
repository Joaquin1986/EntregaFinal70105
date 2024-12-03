const { PetDto } = require('../dto/pet.dto');
const { PetDao } = require('../dao/pet.dao');
const { mongoose } = require ('mongoose');

class PetRepository {

    static async getPet(id) {
        if (mongoose.isValidObjectId(id)) {
            const dtoPet = new PetDto(await PetDao.getPetById(id));
            return dtoPet;
        }
        return null;
    }
}

module.exports = { PetRepository };