const axios = require('axios')
const { expect } = require('chai')

const client = axios.create({
    baseURL : 'http://localhost:3000'
})
