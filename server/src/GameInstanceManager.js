import '@geckos.io/phaser-on-nodejs';
import Phaser from 'phaser';
import ObrnGame from "./ObrnGame.js";
export default class GameInstanceManager {
    constructor(instances) {
        this.instances = instances;
    }
    createInstance() {
        let port = Math.floor(Math.random() * 10000) + 50000;
        return new ObrnGame(port, GameInstanceManager.PHASER_GAME_CONFIG);
    }
    addInstance(roomId, gameInstance) {
        this.instances[roomId] = gameInstance;
    }
    getInstance(key) {
        return this.instances[key];
    }
    debugGetInstances() {
        return this.instances;
    }
}
GameInstanceManager.PHASER_GAME_CONFIG = {
    width: 960,
    height: 540,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    type: Phaser.HEADLESS,
    banner: false,
    audio: {
        noAudio: true
    }
};
