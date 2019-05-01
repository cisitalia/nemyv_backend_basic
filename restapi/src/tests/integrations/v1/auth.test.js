import request from 'supertest'
import randomString from 'random-string'
import jwt from 'jsonwebtoken'
import models from '../../../models'
import userRopo from '../../../repositories/user.repository'

const app = require('../../../app')

afterAll(() => {
    models.mdb.close()
    models.udb.close()
})

describe('로그인 테스트', () => {

    let userData = {
        email: 'BBB@test.com',
        password: 'Gd6DY92p'
    }
    let token

    beforeAll(async () => {
        // 로그인 테스트용 사용자 패칭 - 이메일과 비번을 넘겨야 한다.
        // userData = await userRopo.findById(3)
    })

    // NOTE: password 는 변환전의 데이터를 넣어야 한다. 로그인시에는 원래 비번을 넣을테니까
    test('실제 로그인 테스트', async () => {
        let response = await request(app)
            .post('/v1/auth/login')
            .send({
                email: userData.email,
                password: userData.password
            })
        // 로그인시 토큰을 생성해서 받아온다!
        expect(response.statusCode).toBe(200)
        expect(response.body.data.token).toBeTruthy()

        // 토큰 풀어 사용하기 - 토큰에 담기 유저정보로 여러가지일을 할 수 있겠지?
        const payload = await jwt.verify(response.body.data.token, process.env.JWT_SECRET)
        console.log(payload)
        expect(userData.email).toBe(payload.email)

        const user = await userRopo.findByEmail(payload.email)
        expect(userData.email).toBe(user.email)

        // 밑에서 테스트 할 수 있도록 토큰을 저장하자.
        token = response.body.data.token
    })

    test.skip('없는 사용자로 로그인 | 404', async () => {
        let response = await request(app)
            .post('/v1/auth/login')
            .send({
                email: 'whoareyou@test.com',
                password: 'worngpassword'
            })

        expect(response.statusCode).toBe(404)
        expect(response.body.data.message).toBe('사용자를 찾을 수 없습니다')
    })

    test.skip('잘못된 비밀번호로 로그인 | 404', async () => {
        let response = await request(app)
            .post('/v1/auth/login')
            .send({
                email: userData.email,
                password: 'worngpassword'
            })

        expect(response.statusCode).toBe(422)
        expect(response.body.data.message).toBe('비밀번호를 확인 해주세요')
    })

    test('토큰으로 사용자 조회 | 200', async () => {
        // Authorization 헤더에 토큰을 보내보자
        let response = await request(app)
            .post('/v1/auth/tokenTest')
            .set('Authorization', `Bearer ${token}`)

        expect(response.body.data.email).toBe(userData.email)
        console.log(response.body.data)
    })
})
