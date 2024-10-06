import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';

const Asteroid = () => {
  const canvasRef = useRef(null); // Reference to the canvas DOM element

  useEffect(() => {
    // Initialize Babylon engine and scene after component mounts
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);

    // Create a basic scene with a camera and a light
    const createScene = () => {
      const scene = new BABYLON.Scene(engine);

      // Create a simple camera looking at the origin
      const camera = new BABYLON.ArcRotateCamera(
        'camera1',
        Math.PI / 2,
        Math.PI / 4,
        4,
        new BABYLON.Vector3(0, 0, 0),
        scene
      );
      camera.attachControl(canvas, true);

      // Create a basic light
      const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
      light.intensity = 0.7;

      // Create a sphere mesh (simple 3D object)
      // Create a sphere mesh (simple 3D object)
      const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
      const material = new BABYLON.StandardMaterial("material", scene)
      material.diffuseColor =  new BABYLON.Color3(0.5,0.5,0.5)
      sphere.material = material

      // Add a ground plane to the scene
     //   const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);

      return scene;
    };

    // Create the scene
    const scene = createScene();

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

export default Asteroid;
