import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PresentationControls, Float } from '@react-three/drei';
import DomaAvatar from './DomaAvatar';

export default function Scene() {
  return (
    <Canvas 
      // 1. Limita la resolución en pantallas Retina a un máximo de 1.5 o 2
      dpr={[1, 1.5]}
      // 2. Reduce la precisión para acelerar WebGL en Safari móvil
      gl={{ 
        powerPreference: 'high-performance', 
        antialias: false, // Desactivar antialias ahorra hasta un 40% de GPU en Safari
        alpha: true 
      }}
      camera={{ position: [0, 0, 3.5], fov: 45 }} 
      style={{ height: '100%', width: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      
      <Suspense fallback={null}>
        <PresentationControls
          global={false}
          snap={true}
          speed={1.5}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 12, Math.PI / 12]}
          azimuth={[-Math.PI / 6, Math.PI / 6]}
        >
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
            <DomaAvatar 
              scale={1.8} 
              position={[0, -2.4, 0]} 
              rotation={[0, 0, 0]} 
            />
          </Float>
        </PresentationControls>

        {/* Carga el preset city sólo si es indispensable */}
        <Environment preset="city" />
      </Suspense>

      {/* 3. OPTIMIZACIÓN CRÍTICA: En ContactShadows, 'resolution' a 256 o 512 evita tirones */}
      <ContactShadows 
        position={[0, -2.5, 0]} 
        opacity={0.4} 
        scale={8} 
        blur={1.5} 
        far={4} 
        resolution={256} 
        frames={1} // Renderiza la sombra una sola vez en lugar de cada frame
      />
    </Canvas>
  );
}