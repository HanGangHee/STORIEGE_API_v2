const axios = require('axios')
const { expect } = require('chai')


const client = axios.create({
    baseURL : 'http://localhost:3000'
})
describe('TEST /auth/join', (done) => {
    it('should receive message :  { success:true }', (done) => {
        client.post('/auth/join', {
            userId: "test1",
            pwd: "test1",
            nick: "test1",
            age: "10",
            sex: "남",
            thema: "A"
        })
        .then(res => {
            console.log(expect(res.data.success).to.equal(true))
            done()
        })
        .catch(res => {
            console.log(res)
            done()
        })
    })
})
describe('TEST /auth/login', (done) => {
    it('should receive message :  { token }', (done) => {
        client.post('/auth/login', {
            userId: "test1",
            pwd: "test1",

        })
            .then(res => {
                console.log(res.data.token || res.data.message)
                done()
            })
            .catch(res => {
                console.log(res)
                done()
            })
    })
})
