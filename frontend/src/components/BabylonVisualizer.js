import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import createSun from './SunFunction'
import createAsteroids from './AsteroidFunction';

const BabylonVisualizer = () => {
  const canvasRef = useRef(null); // Reference to the canvas DOM element

  useEffect(() => {
    // Initialize Babylon engine and scene after component mounts
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    const scale = 25

    // Create a basic scene with a camera and a light
    var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 5, Math.PI / 3, 500, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
    
        return scene;
    };

    // Create the scene
    const scene = createScene();
    createSun(scene, scale)
    createAsteroids(scene, scale)

    // Render the scene every frame
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Handle browser resize
    window.addEventListener('resize', () => {
      engine.resize();
    });

    return () => {
      // Clean up Babylon resources when component unmounts
      engine.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default BabylonVisualizer;
