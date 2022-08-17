import * as React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';



const StyledBody = styled.body`
    height: 100vh;
    width:100vh;
    background-color: #EC8034;
    
    }
`;

const StyledContainer = styled.div`
    height: 100vh;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    }
`;

const StyledCloumn = styled.div`
    height: 100vh;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    }
`;


const StyledFaceDetectionImg = styled.img`
    height: 440px;
    width: 410px;

    }
`;

const StyledBackground = styled.img`
position: absolute;
height:100vh;
width:100vw;
left: 0%;
right: 0%;
top: 0%;
bottom: 0%;

    }
`;


const FaceDetectionLoad = () => {

  return (
    <StyledBody>
       
   <div >
   <StyledBackground src='img/faceDetectionBg.png'/>
   
   <StyledContainer>
    
    <div>
    
    <StyledFaceDetectionImg src='img/faceDetection.png'/>
    </div>
   
    </StyledContainer>
          </div>
    </StyledBody>
  );
};

export default FaceDetectionLoad;
