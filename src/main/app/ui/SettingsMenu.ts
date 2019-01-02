
export class SettingsMenu extends Phaser.Scene {
    constructor() {
        super('SettingsMenu');
    }

    preload() {
        // Load config file
        this.load.json('config', 'config.json');

        console.log('Settings menu loaded');
    }

    create() {
        // Build 

    }
}