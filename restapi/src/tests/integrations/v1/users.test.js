import request from 'supertest'
import randomString from 'random-string'
import { uuid } from '../../../utils/uuid'
import models from '../../../models'

const app = require('../../../app')

let user

// beforeAll(async () => {
//     // 사용자 2명 생성
//     await models.User.create({
//         email: randomString() + '@test.com',
//         password: randomString(),
//         dbcode: 'ldk_5678'
//     })

//     user = await models.User.create({
//         email: randomString() + '@test.com',
//         password: randomString(),
//         dbcode: 'ldk_1234'
//     })
// })

afterAll(() => {
    models.mdb.close()
    models.udb.close()
})

describe('GET: /v1/users', () => {

    test.skip('유저 생성 테스트', () => {
        console.log(user)
        expect(user.dbcode).toEqual('ldk_1234');
    })

    test.skip('전체 사용자 조회 | 200', async () => {
        let id = 2
        let response = await request(app)
            .get(`/v1/users/${id}`)
        expect(response.body.email).toBe('AAA@test.com')
    })

    test.skip('잘못된 id 로 조회 | 404 ', async () => {
        let id = 1
        let response = await request(app)
            .get(`/v1/users/${id}`)

        expect(response.status).toBe(404);
    });
})
