# Haunted House Game (working title)

## Overview

This is a game project I've set out on to teach myself different aspects of Phaser.

Haunted House is a cross between The Sims, Rollercoaster Tycoon, and Tower Defense, with a splash of horror a la Plants vs Zombies. The goal is to run a successful haunted house business; make money, hire actors, build the haunt, advertise, and scare customers to get good reviews! As the years go on, you can acquire higher-quality venues, buy better props, invest in side attractions and food, and hire better-quality actors and staff; do poorly and you may just be run out of business!

## Gameplay

The game is split into seasons; each season has a set number of open days and a cost. You're given a business loan at the start of the game, and you have to try to make enough money to pay your actors, buy or lease your props, and pay back the payments on the loan. The goal for a season is to improve your ranking to a certain level, make money, and garner good reviews.

Seasons are broken up into build/training days and haunt days. There's also a teardown cost to ending a season; everything has to be cleaned up, and the more you have, the more it costs. Build days require hiring staff and actors, most of which will be retained for multiple seasons, as well as ordering equipment, setting it up, and training actors. Haunt days are where reviews are made; good equipment and staff mean nothing without your guiding influence; take control of actors and set up a scare, and have your staff patrol the haunt for troublemakers, bodily functions, and bathroom breaks. Actors will improve when they are taught, but they will figure things out on their own as well from experience! Set up the atmosphere of a room, assign good actors with good costumes, and try and get the biggest scares!

There's a story mode and a free play mode; story mode ends when you've played through all the pre-made levels, and free play mode is all about raking in the cash through the environments built for story mode.

## Configuration

The config.json file (src/main/resources/assets/config.json) contains different configuration settings for setting up the game to work on the current platform; it will also store the current game settings upon deployment. Defaults are configured in config_default.json, in the same location.

## Architecture

Right now, this game consists of two components:

* The game assets, written in Phaser 3x/TS
* The game server (NPM http-server)

The static game assets (code, resources, etc) must be compiled and placed into the ./target directory,
where the game server will serve them from.

We have a bootstrapper.ts file, which will load Phaser when invoked and will load in a config file from resources/config.json,
set up the game configuration, and then will load the title screen.

Code components will be loaded from subdirectories of the src/main/app folder, organized by functionality:

* config - Components for managing game configuration (options loader, keybinds, etc.)
* game - Gameplay components (dialog trees, bootstrapper, etc.)
* gfx - Graphical effects (particle management, etc.)
* sound - Sound effects (sound channels, repeaters, etc.)
* ui - UI components (menus, screens, etc.)
* util - Utilities (math, timing, data structures, etc.)

### Compilation and Deployment

To build the game, run

> npm run build

To deploy the game, run

> npm run deploy

The game should launch in a browser window.

To continue building the game as you update files, open a second bash shell and run

> npm run build-watch

### Compilation Output

After compilation, there should be the following files in ./target:

* assets - A folder which contains all core game assets
    * config.json - User-configurable settings which are loaded in at game startup
* node_modules - The core node modules folder loaded from NPM
* index.html - The HTML5 bootstrapper file (loaded into http-server, displays the game itself)
* bootstrapper.js - The compiled entry point into the game code

> TODO - Compile to a single minified file?

In addition, there should be subfolders (graphics, sound, ui) which contain the static compiled JS files which comprise the game.

## Tasks to do:

* Clean up names of things
* Set up unit test framework for more complicated components
* Start writing game components