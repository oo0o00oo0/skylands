import styled from "styled-components"
import Div100vh from "react-div-100vh"
import Scene from "./components/scenes/Scene"
// import Interface from "./components/ui/Interface"
import Splash from "./pages/Splash/Splash"
import AnimatedBackground from "./components/ui/Background"
import { theme } from "./theme/theme"
import Navigation from "./components/ui/Navigation"
// import "./index.css"

function App() {
  return (
    <AppContainer>
      <BodyContainer>
        <Scene />
        <Splash />
      </BodyContainer>
      <AnimatedBackground />
      <Navigation />
    </AppContainer>
  )
}

export default App

const AppContainer = styled(Div100vh)`
  touch-action: none;
`

const BodyContainer = styled.div`
  border: ${theme.debug ? "red solid 2px" : "none"};
  box-sizing: border-box;
  /* position: relative; */
  position: absolute;
  /* padding: 20px; */

  height: ${theme.body};
  width: 100%;

  display: flex;
  flex-direction: column;
`
