import React, { useEffect } from 'react';
import * as BABYLON from '@babylonjs/core';


const createSun = function(scene){
    const scale = 25
      scene.clearColor = new BABYLON.Color4(0, 0, 0, 1); // Light blue background

      // Create a sphere mesh (simple 3D object)
      const CoreSphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2*scale }, scene);
      const CoreMaterial = new BABYLON.StandardMaterial("material", scene)
      CoreMaterial.diffuseColor =  new BABYLON.Color3(1,1,0)
      CoreMaterial.emissiveColor = new BABYLON.Color3(0.3773, 0.0930, 0.0266); 
      CoreMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      CoreSphere.material = CoreMaterial

      //Make a particle system 

      const coreParticles = new BABYLON.ParticleSystem("coreParticles",1600,scene);
      coreParticles.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Sun/T_SunSurface.png", scene);
      coreParticles.preWarmStepOffset = 10;
      coreParticles.preWarmCycles = 100;

      //Set up emitter type
      const emitterType = new BABYLON.SphereParticleEmitter();
      emitterType.radius = 1*scale;
      emitterType.radiusRange = 0;


      coreParticles.emitter = CoreSphere;
      coreParticles.particleEmitterType = emitterType;
      
      coreParticles.addColorGradient(0, new BABYLON.Color4(0.8509, 0.4784, 0.1019, 0.0));
      coreParticles.addColorGradient(0.4, new BABYLON.Color4(0.6259, 0.3056, 0.0619, 0.5));
      coreParticles.addColorGradient(0.5, new BABYLON.Color4(0.6039, 0.2887, 0.0579, 0.5));
      coreParticles.addColorGradient(1.0, new BABYLON.Color4(0.3207, 0.0713, 0.0075, 0.0));
  
  
      // Size of each particle (random between...
      coreParticles.minSize = 0.4*scale;
      coreParticles.maxSize = 0.7*scale;
  
  
      // Life time of each particle (random between...
      coreParticles.minLifeTime = 8.0;
      coreParticles.maxLifeTime = 8.0;
  
      // Emission rate
      coreParticles.emitRate = 200;

      coreParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

      // Set the gravity of all particles
      coreParticles.gravity = new BABYLON.Vector3(0, 0, 0);

  
      // Angular speed, in radians
      coreParticles.minAngularSpeed = -0.27;
      coreParticles.maxAngularSpeed = 0.27;
  
      // Speed
      coreParticles.minEmitPower = 0;
      coreParticles.maxEmitPower = 0;
      coreParticles.updateSpeed = 0.005;
  
    
  
      // No billboard
      coreParticles.isBillboardBased = false;

      coreParticles.renderingGroupId = 1;
      CoreSphere.renderingGroupId = 1;
      // flareParticles.renderingGroupId = 1;
  
      // Start the particle system
      coreParticles.start();

      return scene;
};

export default createSun;