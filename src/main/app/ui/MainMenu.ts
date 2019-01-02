
export class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Load config file
        this.load.json('config', 'config.json');

        console.log('Config loaded!');
    }

    create() {
        // Set up title

        // Set up start/continue game button
        // TODO How do we configure save files?

        // Set up settings button

    }
}