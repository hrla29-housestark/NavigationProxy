const express = require('express');
const proxy = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const request = require('request')
const path = require('path')

const app = express();
const port = 3002;
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../client/static')))

app.use('/api', proxy({
    target: 'localhost:3002',
    router: {
        '/nav': 'http://localhost:3001',
        '/products': 'http://localhost:1000',
        '/products/:productID': 'http://localhost:1000',
        '/productDetails' : 'http://localhost:3004',
    },
    changeOrigin: true
}))
app.use('/', proxy({
    target: 'localhost:3002',
    router: {
        '/ratings': 'http://localhost:3003',
        '/reviews': 'http://localhost:3003'
    },
    changeOrigin: true
}))

app.listen(port, () => console.log(`Succesfully listening port ${port}`))
