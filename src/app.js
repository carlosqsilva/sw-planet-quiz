import React, { Component } from "react"
import styled from "styled-components"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { inject, observer } from "mobx-react"
import Home from "./routes/home"
import Game from "./routes/game"
import Intro from "./routes/intro"

import background from "./assets/stars-bg.jpg"

@inject("game")
@observer
class App extends Component {
  state = {
    show: false
  }

  componentDidMount() {
    setTimeout(() => this.props.game.init(), 500)

    this.prompt = null
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault()
      this.prompt = e
      this.setState({ show: true })
    })
  }

  onClick = () => {
    this.prompt.prompt()
    this.prompt.userChoice.then(() => {
      this.setState({ show: false })
      this.prompt = null
    })
  }

  render() {
    return (
      <Router basename={PUBLIC_URL}>
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route path="/intro" component={Intro} />
          <Route path="/game" component={Game} />
          <Install show={this.state.show} onClick={this.onClick}>
            Add to HomeScreen
          </Install>
        </Wrapper>
      </Router>
    )
  }
}

const Wrapper = styled.section`
  background: #000;
  background: url(${background}) center center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Install = styled.button`
  appearance: none;
  border: none;
  color: #000;
  padding: 0.5rem;
  background-color: #ffff82;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  display: ${props => (props.show ? "initial" : "none")};
`

export default App
