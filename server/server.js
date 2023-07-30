// imports for server
import express from 'express';
import http from 'http';
import path from 'path';
import * as url from 'url';
import GameInstanceManager from './src/GameInstanceManager.js';
const app = express();
const httpServer = http.createServer(app);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
let gameInstanceManager = new GameInstanceManager({});
app.use('/', express.static(path.join(__dirname, '../client')));
app.get('/api/isRunning', (req, res) => {
    res.status(200).json(true);
});
app.get('/debug/getGames', (req, res) => {
    res.status(200).json(gameInstanceManager.debugGetInstances());
});
app.get('/debug/newGame', (req, res) => {
    let gameInstance = gameInstanceManager.createInstance();
    let roomId = Math.floor((Math.random() * 899 + 100)).toString();
    gameInstanceManager.addInstance(roomId, gameInstance);
    gameInstance.start();
    res.status(200).json({ roomId: roomId });
});
let port = 3000;
httpServer.listen(port);
console.log("Started server at http://127.0.0.1:" + port);
