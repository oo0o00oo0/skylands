import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats } from "@react-three/drei"
import { Suspense } from "react"
import LaminaENV from "../env/LaminaENV"
import Landscape from "../objects/Landscape"
import CameraControls from "./camera/CameraControls"

export default function Scene() {
  return (
    <Canvas
      // frameloop="demand"
      dpr={[1, 2]}
      camera={{ position: [200, 190, 240] }}
    >
      {/* <Stats /> */}
      <OrbitControls />
      <Suspense fallback={null}>
        <group position={[0, 0, 0]}>
          <Landscape />
        </group>
        <LaminaENV />
      </Suspense>
    </Canvas>
  )
}
