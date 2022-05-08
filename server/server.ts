// imports for server
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')

// imports for  phaser
require('@geckos.io/phaser-on-nodejs')
const { SnapshotInterpolation } = require('@geckos.io/snapshot-interpolation')
const SI = new SnapshotInterpolation()
const Phaser = require('phaser')

app.use('/', express.static(path.join(__dirname, '../client')))

app.get('/api/isRunning', (req: any, res: any) => {
    res.status(200).json(true)
});

let port: Number = 3000;
server.listen(port);
console.log("Started server at http://127.0.0.1:" + port);
