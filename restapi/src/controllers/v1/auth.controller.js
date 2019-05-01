import httpStatus from 'http-status'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userRepo from '../../repositories/user.repository'
import response from '../../utils/response'

const login = async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const user = await userRepo.findByEmail(email)

        if (!user) {
            return next(createError(404, '사용자를 찾을 수 없습니다'))
        }

        // NOTE: email: BBB@test.com / password: Gd6DY92p

        // 비밀번호 compare
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return next(createError(422, '비밀번호를 확인 해주세요'))
        }

        // jwt payload 에 담길 내용 : 로그인한 유저의 정보(필요한 정보를 추가해도 된다)
        const payload = {
            email: user.email,
            uId: user.id,
            dbcode: user.dbcode
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRESIN
        })

        return response(res, { token })
    } catch (e) {
        next(e)
    }
}

const tokenTest = async (req, res, next) => {
    try {
        // jwt.middleware 에 의해 req.user에 유저정보가 있을 것임
        // console.log(req.user)
        return response(res, req.user)
    } catch (e) {
        next(e)
    }
}

export {
    login,
    tokenTest
}
