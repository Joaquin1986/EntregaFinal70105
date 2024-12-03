class UserDto {
    constructor(user) {
        // Se muestra el '_id' enmascarado como 'code' para la verificación de los usuarios tras el mocking
        this.code = user._id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.user_level = user.role;
        this.cart = user.cart._id;
        this.pets = user.pets;
    }
}

module.exports = { UserDto };