import models from '../models'

const userRepo = {}

// NOTE: create
userRepo.store = async function (data) {
    return await models.User.create(data)
}

// NOTE: read
userRepo.all = async function () {
    return await models.User.findAll()
}

// NOTE: find by id
userRepo.findById = async function (id) {
    return await models.User.findByPk(id)
}

// NOTE: find by email
userRepo.findByEmail = async function (email) {
    return await models.User.findOne({
        where: {
            email
        }
    })
}

// NOTE: update
userRepo.updatePasswordById = async function(id, password) {
    return await models.User.update({
        password: password
    }, {
        where: {
            id: id
        }
    })
}

// NOTE: delete

export default userRepo
