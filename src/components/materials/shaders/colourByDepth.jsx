import { useEffect, useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useSpring } from "@react-spring/core"
import { animated } from "@react-spring/three"
import { animated as a } from "@react-spring/web"
import { Html, useGLTF, useTexture } from "@react-three/drei"
import { extend, useFrame, useLoader } from "@react-three/fiber"
import fragment from "./glsl/main.frag"
import vertex from "./glsl/main.vert"
import { useStore } from "../../../state/store"

class BasicShaderClass extends THREE.ShaderMaterial {
  constructor() {
    // Uni
    super({
      uniforms: {
        uBounds: { value: 0.0 },
        uGreen: { value: 0.0 },
        uTexture: { value: new THREE.Texture() },
      },

      vertexShader: vertex,

      fragmentShader: fragment,
    })
  }

  get uGreen() {
    return this.uniforms.uGreen.value
  }

  set uGreen(v) {
    this.uniforms.uGreen.value = v
  }
  get uBounds() {
    return this.uniforms.uBounds.value
  }

  set uBounds(v) {
    this.uniforms.uBounds.value = v
  }
  ////////////////////////////////
  get uTexture() {
    return this.uniforms.uTexture.value
  }

  set uTexture(v) {
    this.uniforms.uTexture.value = v
  }
}

extend({ BasicShaderClass })

const AnimatedBasicShaderClass = animated("basicShaderClass")

export function DepthColourShader({ bounds, green, props }) {
  const texture = useStore((s) => s.texture)

  console.log("texture::", texture)
  const shaderRef = useRef()
  const geoRef = useRef()

  const { x } = useSpring({
    x: green ? 0.0 : 1.0,
  })

  return (
    <>
      <Html>
        <a.h1>{x.to((x) => x.toFixed(2))}</a.h1>
      </Html>
      <AnimatedBasicShaderClass
        {...props}
        uTexture={texture}
        side={THREE.DoubleSide}
        ref={shaderRef}
        wireframe={false}
        flatShading={true}
        attach="material"
        uBounds={bounds}
        uGreen={x}
      />
    </>
  )
}
