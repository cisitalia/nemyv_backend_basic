import httpStatus from 'http-status'
import createError from 'http-errors'
import userRepo from '../../repositories/user.repository'
import response from '../../utils/response'
// import bcrypt from 'bcrypt'

// User 모델에 대한 비즈니스 로직 처리
// users 테이블은 manage 디비에 속해 있으므로 이상없이 sequelize를 사용할 수 있다.
const get = async (req, res, next) => {
    try {
        if (req.params.id) {
            const user = await userRepo.findById(req.params.id)

            if (!user) {
                throw createError(httpStatus.NOT_FOUND, '사용자를 찾을 수 없습니다')
            }

            // 비번 암호화 & update password
            // const salt = await bcrypt.genSalt(10)
            // user.password = await bcrypt.hash(user.password, salt)
            // await userRepo.updatePasswordById(user.id, user.password)

            return response(res, { user })
        } else {
            const users = await userRepo.all()

            return response(res, { users })
        }
    } catch (e) {
        next(e)
    }
}

export {
    get
}
