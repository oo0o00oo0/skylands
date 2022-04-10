import { useState, useEffect } from "react"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats } from "@react-three/drei"
import { Suspense } from "react"
import LaminaENV from "../env/LaminaENV"
import Landscape from "../objects/Landscape"
import CameraControls from "./camera/CameraControls"

import { useTransition } from "@react-spring/core"
import { animated } from "@react-spring/web"
import { useStore } from "../../state/store"
import styled from "styled-components"

export default function Scene() {
  const img = useStore((s) => s.img)
  const [ready, set] = useState(false)

  useEffect(() => {
    if (img) {
      setTimeout(() => set(true), 400)
    } else {
      setTimeout(() => set(false), 300)
    }
  }, [img])

  const transition = useTransition(ready, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transition(
    (style, item) =>
      item && (
        <Holder style={style}>
          <View>
            <Canvas
              // frameloop="demand"
              dpr={[1, 2]}
              camera={{ position: [200, 190, 240] }}
            >
              <OrbitControls />
              <Suspense fallback={null}>
                <group position={[0, 0, 0]}>
                  <Landscape />
                </group>
                <LaminaENV />
              </Suspense>
            </Canvas>
          </View>
        </Holder>
      )
  )
}

const Holder = styled(animated.div)`
  z-index: 9;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  /* padding: 20px; */
`

const View = styled.div`
  border-radius: 6vh;
  overflow: hidden;
  width: 100%;
  height: 100%;
`
