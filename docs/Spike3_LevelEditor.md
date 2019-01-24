# Level Editor prototype spike

This spike consists of two prototypes:

- WallCreation, the main editor,
- LevelLoader, the level initializer

Other components of this system will be added as necessary.

## Level Loader

The level loader loads two separate files in the preload step of a scene:

- {level}_pack.json - The pack file which initializes the assets for a level
- {level}.json - The Level structure, as a JSON file

