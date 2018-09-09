const axios = require('axios')
const { expect } = require('chai')

const client = axios.create({
    baseURL : 'http://localhost:3000'
})



describe('TEST /wiki/user', (done) => {
    let token = ""
    before((done) => {
        client.post('/auth/login', {
            userId: "test1",
            pwd: "test1",})
            .then(res => {
                console.log('=============')
                console.log(res.data.token)
                console.log('=============')
                token =  res.data.token
                done()
            })
            .catch(res => {
                console.error(res)
                done()
            })
    })

    it("TEST GET /wiki/user", (done) => {
        client.get(`/wiki/user?token=${token}`)
            .then( res => {
                console.log(res.data)
                done()
            })
            .catch( res => {
                console.error(res)
                done()
            })
    })
})

describe('TEST POST /wiki', (done) => {
    let token = ""
    before((done) => {
        client.post('/auth/login', {
            userId: "test1",
            pwd: "test1",})
            .then(res => {
                token = res.data.token
                done()
            })
            .catch(res => {
                console.error(res)
                done()
            })
    })

    it("TEST POST /wiki", (done) => {
        client.post(`/wiki`, {
            token,
            title : "test4 테스트다!",
            content : "test4 한강sfasdfasdf",
            parentId : 0,
            tag : "#gksrkdmgl2 #java2 #naver1"
        })
            .then( res => {
                expect(res.data.success).to.equal(true)
                done()
            })
            .catch( res => {
                console.error(res)
                done()
            })
    })
})




describe('TEST delete /wiki', (done) => {
    let token = ""
    before((done) => {
        client.post('/auth/login', {
            userId: "test1",
            pwd: "test1",})
            .then(res => {
                token = res.data.token
                done()
            })
            .catch(res => {
                console.error(res)
                done()
            })
    })

    it("TEST delete /wiki", (done) => {
        client.delete(`/wiki/3?token=${token}`)
            .then( res => {
                expect(res.data.success).to.equal(true)
                done()
            })
            .catch( res => {
                console.error(res)
                done()
            })
    })
})


describe.only('TEST put /wiki/', (done) => {
    let token = ""
    before((done) => {
        client.post('/auth/login', {
            userId: "test1",
            pwd: "test1",})
            .then(res => {
                token = res.data.token
                done()
            })
            .catch(res => {
                console.error(res)
                done()
            })
    })

    it("TEST put /wiki/title/4", (done) => {
        client.put(`/wiki/title/4?token=${token}`,
            {
                title : "update title"
            })
            .then( res => {
                expect(res.data.success).to.equal(true)
                done()
            })
            .catch( res => {
                console.error(res)
                done()
            })
    })
    it("TEST put /wiki/content/4", (done) => {
        client.put(`/wiki/content/4?token=${token}`, {
            content : "update content"
        })
            .then( res => {
                expect(res.data.success).to.equal(true)
                done()
            })
            .catch( res => {
                console.error(res)
                done()
            })
    })
    it("TEST put /wiki/parent/4", (done) => {
        client.put(`/wiki/parent/4?token=${token}`, {
            parentId : 0,
        })
            .then( res => {
                expect(res.data.success).to.equal(true)
                done()
            })
            .catch( res => {
                console.error(res)
                done()
            })
    })
    it("TEST put /wiki/like/4", (done) => {
        client.put(`/wiki/like/4`, {
            token,
            like : true
        })
            .then( res => {
                expect(res.data.success).to.equal(true)
                done()
            })
            .catch( res => {
                console.error(res)
                done()
            })
    })
})