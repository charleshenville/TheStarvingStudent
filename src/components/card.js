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
      style={{ borderRadius: "10px", backgroundColor: "#f7f7f7" }}
    >
      <div style={{
        height: 200,
        width: 200
      }}>
        <img
          style={{
            objectFit: 'cover',
            borderRadius: '10px',
            height: '100%',
            width: '100%'
          }}
          src={props.props.StoreImage}
        />
      </div>

      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
        style={{ maxWidth: '50%' }}
      >
        <div style={{
          fontWeight: 'bolder',
          fontSize: '24px',
          color: '#352b61'
        }}>
          {x}
        </div>
        <Text
          my={1}
          display="block"
          fontSize="md"
          lineHeight="normal"
          fontWeight="semibold"

        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr repeat(4, 1fr)', alignItems:'start' }}>
            {props.props.Rating ? props.props.Rating + "/5" : 'N/A'}
            <svg style={{paddingTop: '0px'}} width="15" height="15" viewBox="0 0 96 91" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48 0L59.2257 34.5491H95.5528L66.1636 55.9017L77.3893 90.4509L48 69.0983L18.6107 90.4509L29.8364 55.9017L0.447174 34.5491H36.7743L48 0Z" fill="black" />
            </svg>
          </div>

        </Text>
        <Text my={2} color="gray.500">
          {props.props.Address}
        </Text>
        <Link width="50%" href={props.props.WebsiteLink} isExternal>

          <Button style={{ border: '1px solid #9c9c9c' }} width="100%" my={2} >
            Order Now
          </Button>

        </Link>
      </Stack>
    </Box>
  );
}

export default RestaurantCards;