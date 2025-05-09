import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function BookModel() {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/book/model.gltf');
  return <primitive object={scene} scale={0.8} position={[0, -1, 0]} rotation={[0.2, 0.5, 0]} />;
}

export default function BookScene() {
  return (
    <div className="w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <BookModel />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={1} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 3} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}