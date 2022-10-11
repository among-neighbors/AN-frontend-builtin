import { Box, Heading, Image, Spinner, VStack } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useMOTECam } from '../../../hooks/useMoteCam';
import { MoteCamMessage } from './MoteCamMessage';
import styles from '../../../styles/MoteCam.module.css';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { MoteCamAge } from './MoteCamAge';
import { useNavigate } from 'react-router-dom';
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MoteCamComponent: React.FC = () => {
  const moteCam = useMOTECam();
  const navigate = useNavigate();

  const handleUI = () => {
    const detectedAge = <MoteCamAge {...moteCam.moteCamAge} />;
    console.log(detectedAge.props.age.message);
    var detextedAgeNum: number = Number(detectedAge.props.age.message);
    console.log(detextedAgeNum);
    if (detextedAgeNum > 50) {
      navigate('/builtin/elder');
    } else {
      navigate('/builtin/');
    }
  };
  return (
    <>
      <StyledContainer>
        <Heading h={'40px'} my={4} w='100%' textAlign='center'>
          {!moteCam.isStarted && 'Start face recognition for custom service :)'}

          {moteCam.isStarted && <MoteCamMessage {...moteCam.moteCamAdvice} />}
        </Heading>
      </StyledContainer>

      <VStack my={4}>
        <StyledContainer>
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
        </StyledContainer>
        <Box
          my={4}
          id='video-frame'
          className={styles.videoFrame}
          display={moteCam.isReady === true ? 'block' : 'none'}
        >
          <video ref={moteCam.videoRef} playsInline className={styles.videoWebcam}></video>
          <canvas ref={moteCam.canvasRef} id='canvas' className={styles.drawCanvas} />
        </Box>
        <StyledContainer>
          <Button
            fullWidth
            variant='contained'
            color='secondary'
            sx={{ mt: 3, mb: 2 }}
            onClick={moteCam.startAndStop}
          >
            {moteCam.isStarted ? 'Stop' : 'Start'}
          </Button>
        </StyledContainer>
      </VStack>

      {/* 완벽하게 사진이 찍히고 난 후 */}
      <Modal isOpen={moteCam.isTakenPhoto} onClose={moteCam.dismissTakenPhoto}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>{'Complete face recognition :)'}</ModalHeader>

          {/* <ModalHeader textAlign='center'>{<MoteCamAge {...moteCam.moteCamAge} />}</ModalHeader> */}
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
    </>
  );
};

export { MoteCamComponent };
