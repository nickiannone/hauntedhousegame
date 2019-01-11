import { MainMenu } from './ui/MainMenu';
import { SettingsMenu } from './ui/SettingsMenu';
import { GameScene } from './ui/GameScene';
import { PauseMenu } from './ui/PauseMenu';
import { EntityMovement } from './game/prototypes/entitymovement/EntityMovement';

export class Bootstrapper {
    boot() {
        var config: GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            backgroundColor: '#440066',
            loader: {
                baseURL: 'assets'
            },
            physics: {
                default: 'arcade'
            },
            scene: [ EntityMovement ]
        };
        console.log('Booting...');
        var game = new Phaser.Game(config);
    }
}