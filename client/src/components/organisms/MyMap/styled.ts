import styled from 'styled-components';

export const StyledMap = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 80%;
  height: 78vh;
  z-index: 15;
  top: 15%;
  left: 0;
  background: #000;
  animation: 0.3s ease-in-out loadEffect2;
  -webkit-animation: 1s ease-in-out loadEffect2;
  @keyframes loadEffect2 {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }

    12% {
      opacity: 0.2;
      transform: translateX(3px);
    }
    15% {
      opacity: 0.3;
      transform: translateX(5px);
    }
    20% {
      opacity: 0.4;
      transform: translateX(10px);
    }
    50% {
      opacity: 0.5;
      transform: translateX(30px);
    }
    70% {
      opacity: 0.6;
      transform: translateX(10px);
    }
    75% {
      opacity: 0.7;
      transform: translateX(5px);
    }
    80% {
      opacity: 0.8;
      transform: translateX(3px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  & .icon {
    position: absolute;
    top: 0px;
    left: calc(50% - 23px);
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.8);
  }

  & .services {
    display: flex;
    position: absolute;
    bottom: 30px;
    right: 20px;
    z-index: 12;

    gap: 15px;
    & > button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 5px;
      cursor: pointer;
    }
  }

  & .back {
    display: flex;
    position: absolute;
    bottom: 42%;
    right: -20px;
    z-index: 12;

    gap: 15px;
    & > button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      width: 50px;
      height: 100px;
      background: #0093ba;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;
