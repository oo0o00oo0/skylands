import styled from "styled-components"
import Div100vh from "react-div-100vh"
import Scene from "./components/scenes/Scene"
import Interface from "./components/ui/Interface"

function App() {
  return (
    <AppContainer>
      <Interface />
      <Scene />
    </AppContainer>
  )
}

export default App

const AppContainer = styled(Div100vh)`
  touch-action: none;
  display: flex;
  justify-content: center;
  align-items: center;
`
