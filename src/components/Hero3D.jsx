import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';

const AnimatedShape = () => {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Gentle rotation
        meshRef.current.rotation.x = time * 0.1;
        meshRef.current.rotation.y = time * 0.15;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.4}>
                <MeshDistortMaterial
                    color="#1a1a1a" // Dark base
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
};

const SimpleParticles = () => {
    const pointsRef = useRef();
    // Generate random points for stars/particles
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
    }

    useFrame((state) => {
        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#8B5CF6"
                sizeAttenuation={true}
                transparent={true}
                opacity={0.8}
            />
        </points>
    )
}

const Hero3D = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#3B82F6" />
                <directionalLight position={[-10, -5, -5]} intensity={1} color="#8B5CF6" />

                {/* Main organic shape */}
                <group position={[2, 0, 0]}>
                    <AnimatedShape />
                </group>

                <SimpleParticles />
            </Canvas>
        </div>
    );
};

export default Hero3D;
