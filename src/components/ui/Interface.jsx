import { useEffect, useRef } from "react"
import styled from "styled-components"
import { TextureLoader } from "three"
import { useStore } from "../../state/store"

import CloudIcon from "./cloudicon.png"

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
      {/* SKYLANDS */}
      {/* <UploadBtn
        style={{ pointerEvents: "auto" }}
        ref={inputRef}
        type="file"
        accept="image/*"
      ></UploadBtn> */}
      <UploadBtn htmlFor="upload-photo">
        <CloudIconHolder src={CloudIcon} />
      </UploadBtn>
      <input
        style={{ pointerEvents: "auto" }}
        ref={inputRef}
        type="file"
        accept="image/*"
        name="photo"
        id="upload-photo"
      />
    </UIHolder>
  )
}

const CloudIconHolder = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
`

const UploadBtn = styled.label`
  pointer-events: auto;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  border: #ece8eb solid 2px;

  border-radius: 4vh;
  height: 2vh;
  font-size: 2vh;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const UIHolder = styled.div`
  pointer-events: none;
  z-index: 2;
  font-size: 80px;
  position: absolute;
  width: 100%;
  height: 100%;

  /* input[type="file"] {
    background: red;
  }

  .custom-file-upload {
    border: 1px solid #ccc;
    padding: 6px 12px;
    cursor: pointer;
  } */

  label {
    cursor: pointer;
    /* Style as you please, it will become the visible UI component. */
  }
  #upload-photo {
   opacity: 0;
   position: absolute;
   z-index: -1;
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
