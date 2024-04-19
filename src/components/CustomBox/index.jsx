import { Flex, Text } from '@chakra-ui/react';

const CustomBox = ({text, firstImage, secondImage}) => {
  return (
    <Flex 
        width="100%"
        justifyContent="space-between"
        align="center"
        borderWidth=".1rem"
        borderRadius="15px"
        py=".5rem"
        px="1rem"
        my="1rem"
        sx={{ boxShadow: '0px 0px 16px 1px grey'}}
    >
        <Text 
            fontSize="md" 
            fontWeight="semibold" 
            color="primary.500"
            px="10px"
        >
            {text}
        </Text>
        <Flex gap={3}>
          {firstImage}
          {secondImage}
        </Flex>
    </Flex>
  )
}

export default CustomBox;