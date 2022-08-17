import * as React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

const StyledFaceDetectionImg = styled.img`
    height: 440px;
    width: 410px;
    }
`;

const StyledBody = styled.body`
    height: 100vh;
    background-color: #EC8034;
    display: flex;
    align-items: center;
    justify-content: center;

    }
`;


const FaceDetectionLoad = () => {

  return (
    <StyledBody>
   <div >
   <Typography
            variant='h6'
            noWrap
            
            sx={{
              mr: 4,
              fontFamily: 'monospace',
              fontWeight: 900,
              fontSize: '24px',
              letterSpacing: '.1rem',
              textDecoration: 'none',
            }}
          >
         맞춤형 서비스를 위해 얼굴 인식을 시작합니다.
   
          </Typography>
    <StyledFaceDetectionImg src='img/faceDetection.png'/>
    
          </div>
    </StyledBody>
  );
};

export default FaceDetectionLoad;
