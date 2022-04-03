import { useEffect, useRef } from "react"
import styled from "styled-components"
import { TextureLoader } from "three"
import { useStore } from "../../state/store"
function Interface() {
  const inputRef = useRef()

  const setImg = useStore((s) => s.setImg)
  const setTexture = useStore((s) => s.setTexture)

  const loader = new TextureLoader()

  useEffect(() => {
    inputRef.current.addEventListener("change", (e) => {
      setImg(e.target.files)

      // const image = new Image()
      // image.onload = function () {
      //   imageData = getImageData(image)
      // }

      let url = URL.createObjectURL(e.target.files[0])
      console.log("URL", url)

      loader.load(
        url,
        (img) => {
          console.log("IMGIMG", img)
          img.flipY = false
          setTexture(img)
        },
        undefined,
        console.log("err")
      )
    })
  }, [])

  return (
    <UIHolder>
      SKYLANDS
      <input
        style={{ pointerEvents: "auto" }}
        ref={inputRef}
        type="file"
        accept="image/*"
      ></input>
    </UIHolder>
  )
}

const UIHolder = styled.div`
  pointer-events: none;
  z-index: 2;
  font-size: 80px;
  position: absolute;
  width: 100%;
  height: 100%;
`

export default Interface

function getImageData(image) {
  const canvas = document.createElement("canvas")
  canvas.width = image.width
  canvas.height = image.height
  const context = canvas.getContext("2d")
  context.drawImage(image, 0, 0)

  return context.getImageData(0, 0, image.width, image.height)
}
