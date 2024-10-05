import React, { useEffect, useRef } from 'react';
import { Engine, Scene } from '@babylonjs/core';

const MyScene = ({ children }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    sceneRef.current = scene;

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener('resize', () => engine.resize());

    return () => {
      engine.dispose();
    };
  }, []);

  const childrenWithScene = React.Children.map(children, (child) => {
    return React.cloneElement(child, { scene: sceneRef.current });
  });

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}>
      {childrenWithScene}
    </canvas>
  );
};

export default MyScene;