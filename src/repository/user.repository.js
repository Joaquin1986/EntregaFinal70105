const { UserDto } = require('../dto/user.dto');
const { UserDao } = require('../dao/user.dao');

class UserRepository {

    static async getUser(id) {
        const user = await UserDao.getUserById(id);
        let dtoUser = null;
        if (user)
            dtoUser = new UserDto(user)
        return dtoUser;
    }

}

module.exports = { UserRepository };