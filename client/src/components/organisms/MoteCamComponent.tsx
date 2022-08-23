import { 
    Box,
    Heading,
    Image,
    Spinner,
    VStack,
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useMOTECam } from "../../../hooks/useMoteCam";
import { MoteCamMessage } from "./MoteCamMessage";
import styles from "../../../styles/MoteCam.module.css";
import styled from 'styled-components';
import Button from '@mui/material/Button';

const StyledContainer = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: center;
    }
`;




const MoteCamComponent = () => {

    const moteCam = useMOTECam()
    return (
        <>
        
        <StyledContainer>
        <Heading h={"40px"} my={4} w='100%' textAlign='center'>
             { !(moteCam.isStarted) && "Start face recognition for custom service :)"}
             
             { moteCam.isStarted && <MoteCamMessage {...moteCam.moteCamAdvice} />}   
             </Heading>
         
        </StyledContainer>
           
            <VStack my={4} >
            <StyledContainer>
                {
                    (moteCam.isStarted === true && moteCam.isReady === false) && 
                        <Spinner
                        thickness='6px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='black'
                        size='xl'
                        my={8}
                        />
                        
                }
               </StyledContainer> 
                <Box my={4} id="video-frame" className={styles.videoFrame} display={ moteCam.isReady === true ? 'block' : 'none' }>
                    <video ref={moteCam.videoRef} playsInline className={styles.videoWebcam}></video>
                    <canvas ref={moteCam.canvasRef} id="canvas" className={styles.drawCanvas} />
                </Box>
                <StyledContainer>
              
                <Button fullWidth variant='contained' color="secondary" sx={{ mt: 3, mb: 2 }}  onClick={moteCam.startAndStop}>
                { moteCam.isStarted ? "Stop" : "Start" }
                </Button>
                </StyledContainer>
             
            </VStack>
            
            {/* 
            완벽하게 사진이 찍히고 난 후 서버에 저장까지 이어지는 경우
            <Modal isOpen={moteCam.isTakenPhoto} onClose={moteCam.dismissTakenPhoto}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{localizedStrings.PHOTO_COMPLETION_TITLE}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image ref={moteCam.photoRef} id='photo' alt="photo"></Image>
                    </ModalBody>

                    <ModalFooter>
                        
                        <Button my={4} colorScheme='blue' onClick={moteCam.downloadPhoto}></Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>         */}
         
        </>
    )
}

export { MoteCamComponent }