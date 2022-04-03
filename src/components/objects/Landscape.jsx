import { useRef, useState, useEffect, useLayoutEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { animated as a } from "@react-spring/three"
import { useSpring } from "@react-spring/core"
// import { DoubleSide, Uint8Array } from "three"
import * as THREE from "three"
// import * as STDLIB from "three-stdlib"
import { ImprovedNoise, SimplifyModifier } from "three-stdlib"
import { Html, useTexture } from "@react-three/drei"
import { DepthColourShader } from "../materials/shaders/colourByDepth"
import { useStore } from "../../state/store"

function Landscape(props) {
  const meshRef = useRef()
  const [bounds, setBounds] = useState()
  const [green, setGreen] = useState(false)
  // const green = useRef(0.0)
  // const img = useTexture(imgURL)
  let imageData

  const loadedImg = useStore((s) => s.img)

  const width = 200
  const height = 200

  const pX = 512
  const pY = 512

  useLayoutEffect(() => {
    const geometry = meshRef.current.geometry
    console.log("LOADEDIMG", loadedImg)
    if (loadedImg) {
      const image = new Image()
      image.onload = function () {
        imageData = getImageData(image)
        displace(geometry, imageData, meshRef.current, setBounds, bounds)
      }

      image.src = URL.createObjectURL(loadedImg[0])

      setTimeout(() => {
        setGreen(true)
      }, 400)
    } else {
      setGreen(false)
    }
  }, [loadedImg])

  const { x } = useSpring({
    x: green ? 9.0 : -10.0,
  })

  return (
    <>
      <a.mesh
        position-y={x}
        onClick={() => setGreen(!green)}
        scale={2}
        rotation-x={-Math.PI / 2}
        ref={meshRef}
        castShadow
        receiveShadow
      >
        <planeBufferGeometry args={[width, height, pX, pY]} />
        <DepthColourShader
          texture={loadedImg}
          wireframe={true}
          bounds={bounds}
          green={green}
        />
      </a.mesh>
    </>
  )
}

function displace(geometry, imageData, meshRef, setBounds) {
  const imageWidth = imageData.width
  const imageHeight = imageData.height
  const pixelRgb = []
  imageData.data.map((v, i) => {
    let all = v + 1
    i % 4 === 0 && pixelRgb.push(v)
  })

  function lookUpPixelColor(pixelRgb, ux, uy) {
    const data = pixelRgb
    let px = Math.floor(ux * (imageWidth - 1))
    let py = Math.floor(uy * (imageHeight - 1))

    let index = px + imageWidth * py

    return data[index]
  }

  const verts = geometry.attributes.position.array
  const uvs = geometry.attributes.uv.array

  for (
    let i = 0, j = 0, uvi = 0, l = verts.length / 3;
    i < l;
    i++, j += 3, uvi += 2
  ) {
    let ux = uvs[uvi]
    let uy = uvs[uvi + 1]
    const disp = lookUpPixelColor(pixelRgb, ux, uy)
    verts[j + 2] = (disp / 255) * 30
  }
  const bbox = new THREE.Box3().setFromObject(meshRef)
  setBounds(bbox.min.y)
  geometry.computeVertexNormals()
  geometry.attributes.position.needsUpdate = true
}

function getImageData(image) {
  const canvas = document.createElement("canvas")
  canvas.width = image.width
  canvas.height = image.height
  const context = canvas.getContext("2d")
  context.drawImage(image, 0, 0)

  return context.getImageData(0, 0, image.width, image.height)
}

export default Landscape
