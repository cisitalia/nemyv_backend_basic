import { uuid } from '../../utils/uuid'

test.skip('ordered UUID 가 출력되어야 합니다', async () => {
    const orderedUuid = await uuid()
    console.log(orderedUuid)
    expect(orderedUuid).toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
})

test.skip('This is a sample', () => {
    expect(true).toBe(true)
})
