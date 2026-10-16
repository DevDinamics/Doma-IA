import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PresentationControls, Float } from '@react-three/drei';
import DomaAvatar from './DomaAvatar';

export default function Scene() {
  return (
    <Canvas 
      shadows 
      // Ajuste de cámara PRO: La ponemos un poco más atrás (Z: 3.5) 
      // para asegurar que vemos el modelo aunque sea grande.
      camera={{ position: [0, 0, 3.5], fov: 45 }} 
      style={{ height: '100%', width: '100%', background: 'transparent' }}
    >
      {/* Iluminación extra para no verlo oscuro */}
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      
      <Suspense fallback={null}>
        <PresentationControls
          global={false}
          snap={true}
          speed={2}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 12, Math.PI / 12]}
          azimuth={[-Math.PI / 6, Math.PI / 6]}
        >
          {/* Usamos Float para darle un movimiento de levitación automático */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            // En Scene.jsx cambia la etiqueta DomaAvatar por esta:
<DomaAvatar 
  scale={1.8} 
  position={[0, -2.4, 0]} // El -2.4 la baja para que le veamos la cara
  rotation={[0, 0, 0]} 
/>
          </Float>
        </PresentationControls>

        {/* El Environment ayuda a que las texturas (ropa/piel) se vean reales */}
        <Environment preset="city" />
      </Suspense>

      {/* Sombra en el suelo para dar profundidad */}
      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4.5} />
    </Canvas>
  );
}