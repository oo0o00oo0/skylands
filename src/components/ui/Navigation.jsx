import { theme } from "../../theme/theme"
import styled from "styled-components"
import LoadButton from "./LoadButton"
import { useStore } from "../../state/store"

function Navigation() {
  const setImg = useStore((s) => s.setImg)

  return (
    <NavWrapper>
      <Clear
        onClick={() => {
          // console.log("object")
          setImg(null)
        }}
      >
        x
      </Clear>
      <LoadButtonWrapper>
        <LoadButton />
      </LoadButtonWrapper>
      <Clear />
    </NavWrapper>
  )
}

export default Navigation

const Clear = styled.div`
  flex: 1;
  height: 50px;
  max-width: 50px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: black;

  /* background-color: black; */
`

const NavWrapper = styled.div`
  border: ${theme.debug ? "black solid 2px" : "none"};
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  padding: 7.5px 25px;
  /* padding: 7.5px;
  padding-bottom: 15px; */
  height: ${theme.nav};
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LoadButtonWrapper = styled.div`
  border: ${theme.debug ? "black solid 2px" : "none"};
  width: 70px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    cursor: pointer;
  }

  #upload-photo {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
`
