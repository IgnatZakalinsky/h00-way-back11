import {agent} from 'supertest'
import {app} from "../../src";

describe('some', () => {
    it('some', async () => {
        const res = await agent(app)
            .get('/')
            .expect(200)
        console.log(res.body)

        // expect(1).toBe(1)
        expect(res.body).toEqual({version: '1.0'})
    })

    it('get ok', async () => {
        const res = await agent(app)
            .get('/1')
            .expect(200)
        console.log(res.body)

        // expect(1).toBe(1)
        expect(res.body).toEqual({id: 1, search: '', query: {}})
    })

    it('get 400', async () => {
        const res = await agent(app)
            .get('/a?search=xxx&b=1')
            .expect(400)
        console.log(res.body)

        // expect(1).toBe(1)
        expect(res.body).toEqual({id: 'NaN', search: 'xxx', query: {search: 'xxx', b: '1'}})
    })

    it('post ok', async () => {
        const res = await agent(app)
            .post('/')
            .set('token', 'some-token')
            .send({some: 'data'})
            .expect(200)
        console.log(res.body)

        // expect(1).toBe(1)
        expect(res.body).toEqual({someData: 'data', token: 'some-token'})
    })
})