import { MainMenu } from './ui/MainMenu';
import { SettingsMenu } from './ui/SettingsMenu';
import { GameScene } from './ui/GameScene';
import { PauseMenu } from './ui/PauseMenu';
import { WallCreation } from './game/prototypes/wallcreation/WallCreation';

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
            scene: [ WallCreation ]
        };
        console.log('Booting...');
        var game = new Phaser.Game(config);
    }
}