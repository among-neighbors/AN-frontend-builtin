import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { useSpeech } from '../../../hooks/useSpeech';

export type MoteCamAdviceMessage = {
  message: string;
  fulfilled: boolean;
};

export type MoteCamAdviceType = {
  // expression: MoteCamAdviceMessage

  faceSize: MoteCamAdviceMessage;
  facePosition: MoteCamAdviceMessage;
};

const MoteCamMessage = ({
  // expression,
  faceSize,
  facePosition,
}: MoteCamAdviceType) => {
  useSpeech(
    // [expression,
    [faceSize, facePosition],
  );

  return (
    <Box my={8}>
      <VStack mx={4}>
        {/* <HStack>
                    <Text>{expression.message}</Text>
                </HStack> */}
        {/* <HStack>
          <Text>{age.message}</Text>
        </HStack> */}
        <HStack>
          <Text>{faceSize.message}</Text>
        </HStack>
        <HStack>
          <Text>{facePosition.message}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export { MoteCamMessage };
