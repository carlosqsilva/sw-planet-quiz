import React from "react"
import styled, { keyframes } from "styled-components"

const pulse = keyframes`
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
  }
`

const Loader = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  position: relative;

  &::before,
  &::after {
    content: "";
    border: 2px solid #f1c40f;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    position: absolute;
    animation: ${pulse} 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
  }

  &::before {
    border: 2px solid #006eff;
    animation-delay: 0.3s;
  }
`

export default () => <Loader />
