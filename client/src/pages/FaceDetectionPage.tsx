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

  return (
    <Box mx={'auto'} as='main' maxWidth={'420px'}>
      <Heading h={"40px"} my={4} w='100%' textAlign='center'>
        이웃사이
      </Heading>
      <Box>
        <MoteCamComponent />
      </Box>
    </Box>   
  )
}

export default FaceDetection;