import * as THREE from "three"
import { Environment, Sphere } from "@react-three/drei"
import { LayerMaterial, Color, Depth, Noise } from "lamina"

export default function LaminaENV() {
  const position = [20, 40, 20]
  return (
    <>
      <Environment background={true} resolution={128}>
        <CustomSphere />
      </Environment>
      {/* <pointLight color="#296e6d" position={position} intensity={2} /> */}
      {/* <Sphere position={position} /> */}
    </>
  )
}

function CustomSphere() {
  return (
    <mesh scale={100}>
      <sphereBufferGeometry />
      <LayerMaterial side={THREE.BackSide}>
        <Color color="blue" alpha={1} mode="normal" />
        <Depth
          colorA="#00ffff"
          colorB="#1e39d3"
          // colorB="#ff8f00"
          // colorB="#ff8f00"
          alpha={0.6}
          mode="normal"
          near={0}
          far={300}
          origin={[100, 100, 100]}
        />
        <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
      </LayerMaterial>
    </mesh>
  )
}
