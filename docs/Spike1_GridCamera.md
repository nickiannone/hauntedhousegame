# GridCamera prototype

## Overview

The purpose of this design spike is to identify how camera movement works in Phaser, and develop the core camera movement
principles of a level. 

## Camera Movement Design

The camera itself is pre-configured in Phaser, to function on a traditional 2D XY plane. Phaser also provides a SmoothedKeyControl utility class which binds a camera to a preconfigured set of cursor keys which we can set up using the Keyboard#createCursorKeys() utility method. These configure the camera to use a standard 2D projection which we can move with drag and acceleration along the XY plane.

The Camera -> World View example on Phaser Labs (http://labs.phaser.io/edit.html?src=src\camera\world%20view.js) shows us how to configure that:

    var controls;

    function create() {
        var cursors = this.input.keyboard.createCursorKeys(); // Creates binding points for the cursor keys
        var controlConfig = {
            camera: this.cameras.main,  // Use the main camera
            left: cursors.left,         // Configure bindings
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.02,         // Accelerate 0.02 units/frame when pressed
            drag: 0.0005,               // Drag 0.0005 units/frame when released
            maxSpeed: 1.0               // Max out at 1.0 units/frame
        };
        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);   // Bind the camera to the given keys
        this.cameras.main.setBounds(0, 0, 4096, 4096);   // Configure the camera within a world-coordinate bounding box and set the zoom level to 1:1

        // NOTE: Rendering items on this grid is a 2:1 ratio!
    }

    function update(time, delta) {
        controls.update(delta); // Update the controls
    }

This should be sufficient for our purposes, though we will need to configure menu overlays for this somehow.