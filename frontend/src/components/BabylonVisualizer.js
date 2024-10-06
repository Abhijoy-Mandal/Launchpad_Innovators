import React, { useEffect, useRef, useState } from 'react';
import * as BABYLON from '@babylonjs/core';
import createSun from './SunFunction'
import AsteroidFunction from './AsteroidFunction';
import Filter from './Filter';

const BabylonVisualizer = () => {
  const canvasRef = useRef(null); // Reference to the canvas DOM element
  const [boxRef, setBoxRef] = useState(null);
  const [entityCount, setEntityCount] = useState(5000)
  // names = Array of strings -> names[index]
  const scale = 25

  useEffect(() => {
    // Initialize Babylon engine and scene after component mounts
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);

    // Create a basic scene with a camera and a light
    var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 5, Math.PI / 3, 500, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        var highlight_sphere = BABYLON.SphereBuilder.CreateSphere('highlight', { segments:10, diameter: 2 }, scene);
        const CoreMaterial = new BABYLON.StandardMaterial("highlight_material", scene)
        CoreMaterial.diffuseColor =  new BABYLON.Color3(1,1,1)
        CoreMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); 
        CoreMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
        highlight_sphere.material = CoreMaterial

        highlight_sphere.Color3 = BABYLON.Color3.White
        highlight_sphere.isPickable = false
        var hl = new BABYLON.HighlightLayer("h1", scene);
        var onPointerMove = function(e) {
            // scene.createPickingRay
            var result = scene.pick(scene.pointerX, scene.pointerY,null,true,camera);
            // console.log(result.thinInstanceIndex
            // scene.pickWithRay
            if (result.hit && result.thinInstanceIndex === -1) {
                /*if(pickedMesh != result.pickedMesh)
                    hl.removeMesh(pickedMesh);
                */
                // var pickedMesh = result.pickedMesh;
                // console.log(pickedMesh);
                highlight_sphere.position = new BABYLON.Vector3(0.0, 0.0, 0.0)
                hl.removeAllMeshes();
                hl.addMesh(result.pickedMesh, BABYLON.Color3.Green());
                //result.pickedMesh
                
            }
            else if (result.hit && result.thinInstanceIndex !== -1) {
              var asts = scene.getMeshByName('root')
              var transf = asts.thinInstanceGetWorldMatrices()[result.thinInstanceIndex]
              highlight_sphere.position = new BABYLON.Vector3(transf.m[12], transf.m[13], transf.m[14])
              hl.removeAllMeshes();
              // hl.addMesh(highlight_sphere, BABYLON.Color3.Green());
            }
            else{
              highlight_sphere.position = new BABYLON.Vector3(0.0, 0.0, 0.0)
              hl.removeAllMeshes();
            }
    
        };
        canvas.addEventListener("pointermove", onPointerMove, false);
        // const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { segments:50, diameterX: 600, diameterY: 1, diameterZ: 600 }, scene)
        // sphere.isPickable = false;
        // sphere.material = CoreMaterial
        return scene;
    };

    // Create the scene
    const scene = createScene();
    createSun(scene, scale)
    var box = AsteroidFunction.createAsteroids(scene, scale)
    setBoxRef(box)

    var propagateBodies = function() {
        var matrices = AsteroidFunction.updateAsteroids(box.thinInstanceGetWorldMatrices())
        // console.log(matrices)
        // box.thinInstanceSetBuffer("matrix", matrices, 16);
        // box.thinInstanceBufferUpdated("matrix")
    }; 

    // Render the scene every frame
    engine.runRenderLoop(() => {
      propagateBodies();
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

  useEffect(() => {
    if(boxRef){
      var matrices =AsteroidFunction.setAsteroids(scale, entityCount, boxRef.thinInstanceGetWorldMatrices())
      boxRef.thinInstanceSetBuffer("matrix", matrices, 16);
      boxRef.thinInstanceBufferUpdated("matrix")
      console.log(entityCount)
    }
  }, [entityCount] )

  return (
    <div>
      <div>
        <Filter parentEntityCount={setEntityCount}/>
      </div>
      <div style={{ width: '100vw', height: '100vh',  }}>
        <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
    </div>
  );
};

export default BabylonVisualizer;
