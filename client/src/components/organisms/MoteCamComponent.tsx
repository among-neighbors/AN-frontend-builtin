import { 
    Box,
    Heading,
    Text,
    Image,
    Button,
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
import styles from "../styles/MoteCam.module.css";
import { useLocale } from "../../../hooks/useLocale";

const MoteCamComponent = () => {

    const moteCam = useMOTECam()
    const { localizedStrings } = useLocale()


    return (
        <>
            <VStack my={4}>
                {
                    (moteCam.isStarted === true && moteCam.isReady === false) && 
                        <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                        my={8}
                        />
                }
                <Box my={4} id="video-frame" className={styles.videoFrame} display={ moteCam.isReady === true ? 'block' : 'none' }>
                    <video ref={moteCam.videoRef} playsInline className={styles.videoWebcam}></video>
                    <canvas ref={moteCam.canvasRef} id="canvas" className={styles.drawCanvas} />
                </Box>
                <Button my={4} mx='auto' size='lg' w='80%' colorScheme='blue' onClick={moteCam.startAndStop}>{ moteCam.isStarted ? "Stop" : "Start" }</Button>
                { moteCam.isStarted && <MoteCamMessage {...moteCam.moteCamAdvice} />}                
            </VStack>

            <Modal isOpen={moteCam.isTakenPhoto} onClose={moteCam.dismissTakenPhoto}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{localizedStrings.PHOTO_COMPLETION_TITLE}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image ref={moteCam.photoRef} id='photo' alt="photo"></Image>
                    </ModalBody>

                    <ModalFooter>
                        <Button my={4} colorScheme='blue' onClick={moteCam.downloadPhoto}>写真を保存</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>        
        </>
    )
}

export { MoteCamComponent }