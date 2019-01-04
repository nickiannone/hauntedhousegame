import { GridCamera } from "../game/prototypes/grid/GridCamera";

export class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Load config file
        this.load.json('config', 'config.json');

        this.scene.add('GridCamera', GridCamera, false);

        console.log('Config loaded!');
    }

    create() {
        // TODO Build out menu components!

        // Just jump straight into the game
        this.scene.start('GridCamera');
    }
}