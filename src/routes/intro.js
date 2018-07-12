import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"

class Intro extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.element.addEventListener(
      "animationend",
      () => {
        this.setState({
          redirect: true
        })
      },
      false
    )
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/game" />
    }

    return (
      <React.Fragment>
        <Wrapper>
          <Container innerRef={e => (this.element = e)}>
            <Title>Episode I</Title>
            <Title>The Quiz awakens</Title>
            <br />
            <p>
              Turmoil has engulfed the B2W headquarters, a star wars planet quiz
              game was proposed, with intent to appease the office.
            </p>
            <p>
              But who would develop such game, no one has time to do. A prophecy
              arises from nowhere, the choosen one would come from the unknown
              regions of the country.
            </p>
            <p>
              The search for the choosen one begins, and a young candidate
              appear, would this new guy be able to develop the star wars planet
              quiz...
            </p>
          </Container>
        </Wrapper>

        <Skip to="/game">SKIP</Skip>
      </React.Fragment>
    )
  }
}

const Wrapper = styled.div`
  transform: perspective(300px) rotateX(25deg);
  transform-origin: 50% 100%;
  text-align: justify;
  position: absolute;
  margin-left: -9em;
  font-weight: bold;
  overflow: hidden;
  font-size: 350%;
  height: 50em;
  width: 18em;
  bottom: 0;
  left: 50%;
`

const Scroll = keyframes`
  to {
    top: -50%
  }
`

const Container = styled.div`
  animation: ${Scroll} 20s linear;
  position: absolute;
  color: #ffff82;
  top: 100%;
`

const Title = styled.h1`
  text-align: center;
`

const Skip = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #fff;
`

export default Intro
