import { ChakraProvider, Spinner } from '@chakra-ui/react';
import * as React from 'react';
import styled from 'styled-components';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { useMOTECam } from '../../../hooks/useMoteCam';
import { MoteCamMessage } from './MoteCamMessage';
import styles from '../../../styles/MoteCam.module.css';
import Button from '@mui/material/Button';
import { MoteCamAge } from './MoteCamAge';
import { useNavigate } from 'react-router-dom';
import { onElderMode } from '~/others/store';
import { useEffect } from 'react';

const StyledBody2 = styled.div`
  display: flex;
  background-color: #f2ece5;
  height: 100vh;
  width: 100%;
`;
const StyledBody = styled.div`
  background-color: #f2ece5;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledImg = styled.img`
  width: 80%;
`;
const StyledImg2 = styled.img`
  width: 200px;
`;

const FaceDetectionForm: React.FC = () => {
  const moteCam = useMOTECam();
  const navigate = useNavigate();

  useEffect(() => {
    moteCam.isTakenPhoto && handleUI();
  }, [moteCam.isTakenPhoto]);

  const handleUI = () => {
    const detectedAge = <MoteCamAge {...moteCam.moteCamAge} />;
    console.log(detectedAge.props.age.message);
    var detextedAgeNum: number = Number(detectedAge.props.age.message);
    console.log(detextedAgeNum);
    detextedAgeNum > 50 && onElderMode();
    detextedAgeNum > 50 ? navigate('/elder') : navigate('/');
  };
  return (
    <div>
      {!moteCam.isStarted ? (
        <>
          <StyledBody2>
            <StyledBackground>
              <StyledImg src='../../../public/img/family.png'></StyledImg>
            </StyledBackground>
          </StyledBody2>
          <Button
            fullWidth
            sx={{
              position: 'absolute',
              bottom: '20%',
              right: '40%',
              height: '70px',
              width: '200px',
            }}
            onClick={moteCam.startAndStop}
          >
            <StyledImg2 src='../../public/img/start.png' />
          </Button>
        </>
      ) : (
        <>
          {' '}
          <StyledBody>
            <div>
              <ChakraProvider>
                <>
                  <Heading h={'40px'} my={4} w='100%' textAlign='center'>
                    {moteCam.isStarted && <MoteCamMessage {...moteCam.moteCamAdvice} />}
                  </Heading>

                  <VStack my={4}>
                    {moteCam.isStarted && !moteCam.isReady && (
                      <Spinner
                        thickness='6px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='black'
                        size='xl'
                        my={8}
                      />
                    )}
                    <Box
                      my={4}
                      id='video-frame'
                      className={styles.videoFrame}
                      display={moteCam.isReady === true ? 'block' : 'none'}
                    >
                      <video
                        ref={moteCam.videoRef}
                        playsInline
                        className={styles.videoWebcam}
                      ></video>
                      <canvas
                        width='100%'
                        ref={moteCam.canvasRef}
                        id='canvas'
                        className={styles.drawCanvas}
                      />
                    </Box>
                  </VStack>
                </>
              </ChakraProvider>
            </div>
          </StyledBody>
        </>
      )}
    </div>
  );
};

export default FaceDetectionForm;
