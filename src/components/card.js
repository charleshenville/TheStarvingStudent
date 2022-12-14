import {
    chakra,
    Tooltip,
    Icon,
    useColorModeValue,
    Image,
    Circle,
    Box,
    Button,
    typography,
    ButtonGroup,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
    AspectRatio,
    Link,
    Stack
  } from '@chakra-ui/react'
import './RestaurantCard.css'

function RestaurantCards(props) {
    var x = props.props.RestaurantName.split(" - ")[0]
    return (
        <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
    >
        <img
        style={{
            resizeMode: "contain",
            height: 200,
            width: 200
          }}
        src={props.props.StoreImage}

        />
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600"
        >
          {x}
        </Text>
        <Link
          my={1}
          display="block"
          fontSize="md"
          lineHeight="normal"
          fontWeight="semibold"
          
        >
          {props.props.Rating} 

        </Link>
        <Text my={2} color="gray.500">
        {props.props.Address} 
        </Text>
        <Button maxWidth="100px" my={2} href={props.props.WebsiteLink}>
          <Link href={props.props.WebsiteLink} isExternal>
            Order Now
            </Link>
        </Button>
      </Stack>
    </Box>
  );
}

export default RestaurantCards;