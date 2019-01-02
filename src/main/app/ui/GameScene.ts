
export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Load config file
        this.load.json('config', 'config.json');

        // TODO Load current game state!

        console.log('Game scene loaded');
    }

    create() {
        // Build game scene
    }
}