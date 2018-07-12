import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import { Redirect } from "react-router-dom"
import styled from "styled-components"

@inject("game")
@observer
class Home extends Component {
  state = {
    redirect: false
  }

  onClick = () => {
    this.setState({ redirect: true })
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/intro" }
    }
    const { ready } = this.props.game
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to={from} />
    }

    return (
      <React.Fragment>
        <Title>
          Not so long time ago, in a company not,<br /> far away....
        </Title>

        <Container show={ready}>
          <Button onClick={this.onClick}>Iniciar</Button>
        </Container>
      </React.Fragment>
    )
  }
}

const Title = styled.h1`
  margin-bottom: 3rem;
  font-size: 1.8rem;
  color: #4bd5ee;
`
const show = () => `
  transform: translateY(0);
  opacity: 1;
`

const Container = styled.div`
  transform: translateY(200px);
  transition: all 400ms linear;
  opacity: 0;

  ${props => props.show && show};
`

const Button = styled.a`
  border: 2px solid #4bd5ee;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  color: #4bd5ee;
  transition: all 200ms ease;

  &:hover {
    border-color: #ffff82;
    color: #ffff82;
  }
`

export default Home
