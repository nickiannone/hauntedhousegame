import { Level } from "./Level";
import { LevelSerializer } from "./serialize/LevelSerializer";

export class LevelLoader {

    private static levelSerializer: LevelSerializer = new LevelSerializer();
    
    public static preloadLevel(scene: Phaser.Scene, levelName: string): string {
        const packFilePath = 'levels/' + levelName + '/pack.json';
        const levelFilePath = 'levels/' + levelName + '/level.json';
        const packCacheKey = 'level_' + levelName + '_pack';
        const levelCacheKey = 'level_' + levelName + '_cache';

        scene.load.pack(packCacheKey, packFilePath);
        scene.load.json(levelCacheKey, levelFilePath);

        return levelCacheKey;
    }

    /**
     * Loads a level on create.
     * @param scene The scene in which to load the level.
     * @param packCacheKey The cache key for the JSON pack file.
     * @param levelCacheKey 
     */
    public static loadLevel(scene: Phaser.Scene, levelCacheKey: string): Level {
        // TODO Add data validation!
        const level: Level = scene.cache.json.get(levelCacheKey);

        LevelLoader.levelSerializer.linkChildren(level);

        // TODO Populate with in-game stuff!
        // LevelLoader.levelSerializer.deserialize(level);

        return level;
    }

}