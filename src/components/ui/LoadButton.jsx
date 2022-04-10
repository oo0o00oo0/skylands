import { useEffect, useRef } from "react"
import styled from "styled-components"
import { TextureLoader } from "three"
import { useStore } from "../../state/store"
import CloudIcon from "../../assets/icons/cloudicon.png"

function LoadButton() {
  const inputRef = useRef()

  const setImg = useStore((s) => s.setImg)
  const setTexture = useStore((s) => s.setTexture)

  const loader = new TextureLoader()

  useEffect(() => {
    inputRef.current.addEventListener("change", (e) => {
      setImg(e.target.files)

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
    <>
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
    </>
  )
}

const CloudIconHolder = styled.img`
  object-fit: cover;
  object-position: center;
  /* padding: 0.5vh 1vh; */
  padding: 4px 8px;
`

const UploadBtn = styled.label`
  pointer-events: auto;

  border: #444 solid 2px;
  border-radius: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default LoadButton
