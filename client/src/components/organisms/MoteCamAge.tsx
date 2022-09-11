import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { useSpeech } from '../../../hooks/useSpeech';

export type MoteCamAgeMessage = {
  message: string;
  fulfilled: boolean;
};

export type MoteCamAgeType = {
  age: MoteCamAgeMessage;
};

const MoteCamAge = ({ age }: MoteCamAgeType) => {
  useSpeech([age]);

  return (
    <Box my={8}>
      <VStack mx={4}>
        <HStack>
          <Text>{age.message}</Text>
        </HStack>
        <HStack></HStack>
      </VStack>
    </Box>
  );
};

export { MoteCamAge };
