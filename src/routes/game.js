import React, { Component } from "react"
import styled from "styled-components"
import { Redirect } from "react-router-dom"
import { inject, observer } from "mobx-react"

import Loader from "../components/loading"
import background from "../assets/card-bg.svg"

@inject("game")
@observer
class Game extends Component {
  constructor(props) {
    super(props)
    if (this.props.game.ready) {
      this.next()
    }
  }

  next = () => {
    this.props.game.next()
  }

  render() {
    const { loading, ready, current } = this.props.game
    const { name, population, climate, terrain, films } = current

    if (!ready) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location }
          }}
        />
      )
    }

    if (!loading) {
      return (
        <React.Fragment>
          <Wrapper>
            <Title>{name}</Title>
            <Container>
              <Text>
                Population: <span>{population}</span>
              </Text>
              <Text>
                Climate: <span>{climate}</span>
              </Text>
              <Text>
                Terrain: <span>{terrain}</span>
              </Text>

              <SubTitle>Featured in films:</SubTitle>
              <List>{films.map(film => <li key={film}>{film}</li>)}</List>
            </Container>
          </Wrapper>
          <Button onClick={this.next}>Next</Button>
        </React.Fragment>
      )
    } else {
      return <Loader />
    }
  }
}

const Wrapper = styled.div`
  background-color: #fff;
  background: url(${background}) no-repeat right center,
    radial-gradient(circle at bottom, #f1f1f1, #ffffff 80%) no-repeat center
      center fixed;
  background-size: 190px, cover;
  border-radius: 8px;
  min-width: 340px;
  margin-bottom: 2rem;
  color: #101010;
`

const Container = styled.div`
  border-top: 2px solid #101010;
  font-size: 1.6rem;
  padding: 1rem;
`

const Title = styled.h1`
  font-size: 1.8rem;
  text-align: center;
`

const SubTitle = styled.h2`
  font-size: 1.6rem;
  text-align: center;
`

const Text = styled.p`
  > span {
    color: #006eff;
  }
`

const List = styled.ul`
  text-align: center;
  margin: 0.4rem 0;
  padding: 0;

  > li {
    list-style: none;
  }
`

const Button = styled.button`
  background: #ffff82;
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  font-size: 1.6rem;
  border: none;
  color: #000;
  cursor: pointer;
`

export default Game
