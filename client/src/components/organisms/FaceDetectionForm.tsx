import { ChakraProvider } from '@chakra-ui/react';
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
import { useEffect, useState } from 'react';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledBody = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
`;

const StyledBackground = styled.img`
  position: absolute;
  height: 100vh;
  width: 100%;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
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
    <StyledBody>
      <div>
        <ChakraProvider>
          {!moteCam.isReady && <StyledBackground src='../../../public/img/load.gif' />}

          {/* {moteCam.isStarted && moteCam.isReady && (
            <StyledBackground src='../../../public/img/black.png' />
          )} */}
          <>
            <StyledContainer>
              <Heading h={'40px'} my={4} w='100%' textAlign='center'>
                {!moteCam.isStarted && 'Start face recognition for custom service :)'}
                {moteCam.isStarted && <MoteCamMessage {...moteCam.moteCamAdvice} />}
              </Heading>
            </StyledContainer>

            <VStack my={4}>
              <Box
                my={4}
                id='video-frame'
                className={styles.videoFrame}
                display={moteCam.isReady === true ? 'block' : 'none'}
              >
                <video ref={moteCam.videoRef} playsInline className={styles.videoWebcam}></video>
                <canvas
                  width='100%'
                  ref={moteCam.canvasRef}
                  id='canvas'
                  className={styles.drawCanvas}
                />
              </Box>
              <StyledContainer>
                <Button
                  fullWidth
                  variant='contained'
                  color='secondary'
                  sx={{ mt: 3, mb: 2 }}
                  onClick={moteCam.startAndStop}
                >
                  {!moteCam.isStarted && 'Start'}
                </Button>
              </StyledContainer>
            </VStack>
            {/* 
             완벽하게 사진이 찍히고 난 후
            <Modal isOpen={moteCam.isTakenPhoto} onClose={moteCam.dismissTakenPhoto}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign='center'>{'Complete face recognition :)'}</ModalHeader>

                 <ModalHeader textAlign='center'>{<MoteCamAge {...moteCam.moteCamAge} />}</ModalHeader> 
                <ModalCloseButton />
                <ModalBody>
                  <Image ref={moteCam.photoRef} id='photo' alt='photo'></Image>
                </ModalBody>
                <ModalFooter>
                  <Button color='primary' onClick={handleUI}>
                    OK
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            
      */}
          </>
        </ChakraProvider>
      </div>
    </StyledBody>
  );
};

export default FaceDetectionForm;
