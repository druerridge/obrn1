import '@geckos.io/phaser-on-nodejs';
import Phaser from 'phaser';
import ObrnGame from "./ObrnGame.js";

export default class GameInstanceManager {
    private readonly instances: Map<string, ObrnGame>;

    private static PHASER_GAME_CONFIG: Phaser.Types.Core.GameConfig = {
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

    constructor(instances: Map<string, ObrnGame>) {
        this.instances = instances;
    }

    createInstance(): ObrnGame {
        let port: number = Math.floor(Math.random() * 10000) + 50000;
        return new ObrnGame(port, GameInstanceManager.PHASER_GAME_CONFIG);
    }

    addInstance(roomId:string, gameInstance: ObrnGame) {
        this.instances.set(roomId, gameInstance);
    }

    getInstance(key:string): ObrnGame | undefined {
        return this.instances.get(key);
    }

    debugGetInstances(): Map<string, ObrnGame> {
        return this.instances;
    }
}