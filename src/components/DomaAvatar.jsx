import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function DomaAvatar(props) {
  const group = useRef()
  // Cargamos el modelo
  const { scene, animations } = useGLTF('/DomaAvatar.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions) {
      console.log("Intentando activar gestos...");
      
      // Intentamos activar el pulgar arriba y los ojos
      // Usamos un pequeño timeout para asegurar que el modelo cargó en memoria
      const timeout = setTimeout(() => {
        if (actions['thumbsUp_R']) {
          actions['thumbsUp_R'].play();
        }
        if (actions['idle_eyes']) {
          actions['idle_eyes'].play();
        }
        if (actions['allOpen_L']) {
          actions['allOpen_L'].play();
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [actions]);

  // --- MOVIMIENTO MANUAL PRO (Aquí es donde la magia ocurre sí o sí) ---
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      
      // 1. FLOTACIÓN (Efecto Levitación IA)
      // El personaje subirá y bajará suavemente en el eje Y
      group.current.position.y = props.position[1] + Math.sin(t * 1.5) * 0.06;

      // 2. BALANCEO (Efecto Respiración/Vida)
      // Rotación suave de lado a lado
      group.current.rotation.y = props.rotation[1] + Math.sin(t * 0.8) * 0.1;
      
      // 3. INCLINACIÓN (Efecto Humanizado)
      // Pequeña inclinación hacia adelante y atrás
      group.current.rotation.x = props.rotation[0] + Math.cos(t * 0.8) * 0.03;

      // 4. SEGUIMIENTO SUTIL DEL MOUSE
      // La cabeza/cuerpo girará levemente hacia donde esté el mouse
      group.current.rotation.y += state.mouse.x * 0.2;
      group.current.rotation.x += -state.mouse.y * 0.1;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/DomaAvatar.glb')