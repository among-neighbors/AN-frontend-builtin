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
import styles from "../../../styles/MoteCam.module.css";

const MoteCamComponent = () => {

    const moteCam = useMOTECam()
    const localizedStrings = { 
        APP_TITLE: "AN-frontend-bultin",
        START_SHOOTING: "Start photo shooting.",
        END_SHOOTING: "Endt photo shooting.",
        PICTURE_DID_TAKE: "Pretty Good photo was taken!",
        GUIDE_MSG_POSITION_GOOD: "It is just good face position",
        GUIDE_MSG_POSITION_TOO_UPPER: "Be a little lower",
        GUIDE_MSG_POSITION_TOO_LOWER: "Be a little upper",
        GUIDE_MSG_POSITION_TOO_RIGHT: "Be a little to the right",
        GUIDE_MSG_POSITION_TOO_LEFT: "Be a little to the left",
        GUIDE_MSG_SIZE_GOOD: "Just the right face size",
        GUIDE_MSG_SIZE_TOO_SMALL: "The face is too small. Bring the face closer to the camera.",
        GUIDE_MSG_SIZE_TOO_BIG: "The face is too big. Move away from the camera a little more.",
        GUIDE_MSG_AGE_LOOKALIKE: "Look like %age years old",
        PHOTO_COMPLETION_TITLE: "Completed",}


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