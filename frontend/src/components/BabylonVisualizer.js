import React, { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import createSun from './SunFunction'

const BabylonVisualizer = () => {
  const canvasRef = useRef(null); // Reference to the canvas DOM element

  useEffect(() => {
    // Initialize Babylon engine and scene after component mounts
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);

    function gaussianRandom(mean=0, stdev=1) {
        const u = 1 - Math.random(); // Converting [0,1) to (0,1]
        const v = Math.random();
        const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        // Transform to the desired mean and standard deviation:
        return z * stdev + mean;
    }

    // Create a basic scene with a camera and a light
    var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 5, Math.PI / 3, 500, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
    
        // var box = BABYLON.BoxBuilder.CreateBox("root", {size: 1});
        var box = BABYLON.SphereBuilder.CreateSphere('root', { segments:5, diameter: 1 }, scene);
    
        // var numPerSide = 40, size = 100, ofst = size / (numPerSide - 1);
    
        var m = BABYLON.Matrix.Identity();
        // console.log(m)
        //var col = 0, index = 0;
    
        // let instanceCount = numPerSide * numPerSide * numPerSide;
        let instanceCount = 50000;
        let orbitRadius = 300;
        let orbitRdiusSpread = orbitRadius/4
        let matricesData = new Float32Array(16 * instanceCount);
        let colorData = new Float32Array(4 * instanceCount);
        for (var x=0; x<instanceCount; x++){
            // m.m[12] = Math.random()*(orbitRdiusSpread + orbitRadius);
            m.m[12] = gaussianRandom(0 , orbitRadius + orbitRdiusSpread);
            m.m[14] = Math.sqrt(orbitRadius*orbitRadius - m.m[12]*m.m[12]) + (2*Math.random()-1)*orbitRdiusSpread;
            if (Math.random()<0.5){
                m.m[14] = -1*m.m[14]
            }
            if (Math.random()<0.5){
                m.m[12] = -1*m.m[12]
            }
            m.m[13] = gaussianRandom(0, orbitRdiusSpread/5)
            // m.m[13] = (2*Math.random()-1)*orbitRdiusSpread/5
            m.copyToArray(matricesData, x * 16);

            colorData[x * 4 + 0] = ((x & 0xff0000) >> 16) / 255;
            colorData[x * 4 + 1] = ((x & 0x00ff00) >>  8) / 255;
            colorData[x * 4 + 2] = ((x & 0x0000ff) >>  0) / 255;
            colorData[x * 4 + 3] = 1.0;
        }
    
        // for (var x = 0; x < numPerSide; x++) {
        //     m.m[12] = -size / 2 + ofst * x;
        //     for (var y = 0; y < numPerSide; y++) {
        //         m.m[13] = -size / 2 + ofst * y;
        //         for (var z = 0; z < numPerSide; z++) {
        //             m.m[14] = -size / 2 + ofst * z;
        //             // console.log(m)
    
        //             m.copyToArray(matricesData, index * 16);
    
        //             var coli = Math.floor(col);
    
        //             colorData[index * 4 + 0] = ((coli & 0xff0000) >> 16) / 255;
        //             colorData[index * 4 + 1] = ((coli & 0x00ff00) >>  8) / 255;
        //             colorData[index * 4 + 2] = ((coli & 0x0000ff) >>  0) / 255;
        //             colorData[index * 4 + 3] = 1.0;
    
        //             index++;
        //             col += 0xffffff / instanceCount;
        //         }
        //     }
        // }
    
        box.thinInstanceSetBuffer("matrix", matricesData, 16);
        box.thinInstanceSetBuffer("color", colorData, 4);
    
        box.material = new BABYLON.StandardMaterial("material");
        box.material.disableLighting = true;
        box.material.emissiveColor = BABYLON.Color3.White();
    
        return scene;
    };

    // Create the scene
    const scene = createScene();
    createSun(scene)

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
