import React, { useEffect } from 'react';
import * as BABYLON from '@babylonjs/core';

function gaussianRandom(mean=0, stdev=1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

const createAsteroids = function(scene){
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

    box.thinInstanceSetBuffer("matrix", matricesData, 16);
    box.thinInstanceSetBuffer("color", colorData, 4);

    box.material = new BABYLON.StandardMaterial("material");
    box.material.disableLighting = true;
    box.material.emissiveColor = BABYLON.Color3.White();

      return scene;
};

export default createAsteroids;