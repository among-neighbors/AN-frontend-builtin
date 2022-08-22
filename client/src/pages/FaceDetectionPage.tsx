import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import styled from 'styled-components';
import { 
  Box,
  Heading,
} from '@chakra-ui/react'
import { MoteCamComponent } from "../components/organisms/MoteCamComponent";


const StyledBody = styled.body`
    height: 100vh;
    background-color: #EC8034;
    display: flex;
    align-items: center;
    justify-content: center;
    }
`;

function FaceDetection() {

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
    <Box mx={'auto'} as='main' maxWidth={'420px'}>
      <Heading h={"40px"} my={4} w='100%' textAlign='center'>
        {localizedStrings.APP_TITLE}
      </Heading>
      <Box>
        <MoteCamComponent />
      </Box>
    </Box>   
  )
}

export default FaceDetection;