import styled from "styled-components"
import { useState, useEffect } from "react"

import { useTransition } from "@react-spring/core"
import { animated } from "@react-spring/web"
import { useStore } from "../../state/store"

import CloudImg from "../../assets/images/cloud_large.png"
import MountainImg from "../../assets/images/mountain_large.png"
import CrossXImg from "../../assets/images/crossX_large.png"
import { theme } from "../../theme/theme"

function Splash() {
  const img = useStore((s) => s.img)
  const [ready, set] = useState(true)

  useEffect(() => {
    console.log(img)
    if (img) {
      setTimeout(() => set(false), 10)
    } else {
      setTimeout(() => set(true), 10)
    }
  }, [img])

  const transition = useTransition(ready, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transition(
    (style, item) =>
      item && (
        <Holder style={style}>
          <Text style={{ flexShrink: 1 }} col1={"#444444"} col2={"#444444"}>
            SKYLANDS
          </Text>
          <Text col1={"#6996da"} col2={"#58C9C9"}>
            TAKE A PHOTO OF THE SKY
          </Text>
          <ImageWrapper>
            <Img src={CloudImg} />
          </ImageWrapper>
          <Text col1={"#DB4370"} col2={"#FFAC0C"}>
            AND WATCH IT TURN INTO A
          </Text>
          <ImageWrapper>
            <Img src={CrossXImg} />
          </ImageWrapper>
          <Text col1={"#A4A656"} col2={"#439A47"}>
            3D LANDSCAPE YOU CAN NAVIGATE
          </Text>
          <ImageWrapper>
            <Img src={MountainImg} />
          </ImageWrapper>
        </Holder>
      )
  )
}

export default Splash
const Text = styled.div`
  border: ${theme.debug ? "blue solid 2px" : "none"};

  flex: 2;
  font-size: 3.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0% 30%;
  text-align: center;
  line-height: 4vh;

  background: linear-gradient(
    ${(props) => props.col1},
    ${(props) => props.col2}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const ImageWrapper = styled.div`
  border: ${theme.debug ? "blue solid 2px" : "none"};
  flex-shrink: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Img = styled.img`
  max-height: 10vh;
`

const Holder = styled(animated.div)`
  position: relative;

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: space-around;
`
