class PetDto {
    constructor(pet) {
        // Se muestra el '_id' enmascarado como 'code' para la verificación de las mascotas luego del mocking
        this.code = pet._id;
        this.name = pet.name || '';
        this.specie = pet.specie || '';
        this.image = pet.image || '';
        this.birthDate = pet.birthDate || '01-01-2024';
        this.adopted = false;
    }
}

module.exports = { PetDto };