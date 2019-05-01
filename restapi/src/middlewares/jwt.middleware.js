import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import userRepo from '../repositories/user.repository'

// 토큰정보(req.headers.authorization)가 있으면 가로채서 로그인한
// 유저정보를 가져다 리턴하는 미들웨어다.
// req.user 에 담아 놓으면 이후 이 밑에 있는 라우터에서는 모두 유저정보를
// req.user 로 조회할 수 있다.
export default async (req, res, next) => {
    try {
        req.user = null

        if (req.headers.authorization) {
            let email
            jwt.verify(
                req.headers.authorization.split(' ')[1],
                process.env.JWT_SECRET,
                (err, payload) => {
                    if (err) {
                        return next(createError(401, '토큰 정보가 유효하지 않습니다.'))
                    }

                    email = payload.email
                })

            const user = await userRepo.findByEmail(email)

            if (!user) {
                return next(createError(404, '사용자를 찾을 수 없습니다.'))
            }

            req.user = user
        }

        next()
    } catch (e) {
        next(e)
    }
}
