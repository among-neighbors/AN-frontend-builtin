import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';
import styled from 'styled-components';
import { MoteCamComponent } from './MoteCamComponent';

const StyledBody = styled.body`
    height: 100vh;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EC8034;
    
    }
`;

const StyledBackground = styled.img`
position: absolute;
height:100vh;
width:100%;
left: 0%;
right: 0%;
top: 0%;
bottom: 0%;
    }
`;

const FaceDetectionForm = () => {
  return (
    <StyledBody>
      <div>
        <ChakraProvider>
          <StyledBackground src='img/faceDetectionBg.png' />
          <MoteCamComponent />
        </ChakraProvider>
      </div>
    </StyledBody>
  );
};

export default FaceDetectionForm;
