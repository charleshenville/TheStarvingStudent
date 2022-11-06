import RestaurantCards from "./components/card";
import TextField from "@mui/material/TextField";

import  ItemTypeCodes  from './src-form-configs/itemtypecodes.json';
import  RestaurantTypeCodes from './src-form-configs/restauranttypecodes';
import  UIRetreivable  from './src-form-configs/uiretreivable.json';

import {
  chakra,
  Tooltip,
  Icon,
  useColorModeValue,
  Image,
  Circle,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  createMultiStyleConfigHelpers,
  ChakraProvider, 
  SimpleGrid, 
  Container

} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import centers from './location.json'
//const fakeResturants = [{name:"timms"},{name:"mcdonalds"}]
const center = { lat: 43.659632, lng: -79.396747 }


function App() {
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyACTEWEy471HWELK-uowv-kirwsuDU_KiE",
    libraries: ['places'],
  })
  const [inputText, setInputText] = useState("");
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [locationCoords, setLocationCoords] = useState(centers)
  //const [restaurants, setRestaurants] = useState(null);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }


  async function calculateRoute() {
    
    //setRestaurants(fakeResturants)
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  //search function
  function List(props) {
    const filteredData = Object.entries(UIRetreivable).map((e) => (e[0])).filter((el) => {
        if (props.input === '') {
            return el;
        } else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
      <Container maxW="80rem" centerContent>
      <SimpleGrid columns={[1, 2, 1, 2]}>
      {filteredData.map((e) => {
     // props object

     const props = {
       StoreImage: e[1].StoreImage,
       RestaurantName: e[0],
       WebsiteLink: e[1].WebsiteLink,
       Rating: e[1].Rating
      }
  return(
  <RestaurantCards props={props} />);
  })};
      </SimpleGrid>
    </Container>
    )
}


Object.entries(UIRetreivable).map((e) => (e[0]));  // var i = 0;
  // var ECard;

  return (

    <ChakraProvider>
      

    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={800}h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%',height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
        {locationCoords.map((location_c) => {
        return <Marker position={location_c} />})}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <h4>
          Starving Student
        </h4>
        <HStack spacing={2} justifyContent='space-between'>
        <h1>React Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />

      <List input={inputText} />
    </div>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Search
            </Button>

          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
      <div>
        {/* {restaurants && restaurants.map(({name},i)=>(<Card name={name} key={i}/>))} */}
      </div>
    </Flex>
    </ChakraProvider>
  )
}

export default App