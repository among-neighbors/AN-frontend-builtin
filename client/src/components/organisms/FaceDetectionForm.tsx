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
import { Typography } from '@mui/material';

const StyledBody = styled.div`
  background-color: #f2ece5;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackground = styled.div`
  position: relative;
`;
// 텍스트를 감싸고 있는 요소
const StyledContainerText = styled.div`
  text-align: center;
  width: 100%;
  height: 90%;
  position: absolute;
  top: 30%;
  color: black;
  font-weight: bold;
  font-family: BlinkMacSystemFont;
`;
const StyledImg = styled.img`
  width: 100%;
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
          <StyledBackground>
            <StyledImg src='../../../public/img/family.svg' />
            <StyledContainerText>
              <Typography
                sx={{
                  display: { xs: 'none', md: 'block' },
                  fontSize: '35px',
                  fontWeight: 700,
                  margin: '10px',
                }}
              >
                맞춤 서비스 진행을 위해 연령대 추정을 시작합니다.
              </Typography>
              <Typography
                sx={{ display: { xs: 'none', md: 'block' }, fontSize: '25px', fontWeight: 500 }}
              >
                연령대 추정에 사용된 이미지는 측정 후 바로 폐기됩니다.
              </Typography>
            </StyledContainerText>
          </StyledBackground>
          <Button
            fullWidth
            sx={{
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
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
