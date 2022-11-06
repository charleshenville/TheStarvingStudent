import RestaurantCards from "./components/card";

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
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (

    <ChakraProvider>
        <Container maxW="80rem" centerContent>
          <SimpleGrid columns={[1, 2, 1, 2]}>
            
          {Object.entries(UIRetreivable).map((e) => {
          
         // props object
  
         const props = {
           Address: e[1].Address,
           Name: e[1].Name,
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
      

    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={200}h='100%' w='100%'>
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
        p={6}
        borderRadius='lg'
        m={5}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <h4>
          The Starving Student
        </h4>
        <HStack spacing={4} justifyContent='space-between'>
          <Box flexGrow={2}>
            <Autocomplete>
              <Input type='text' placeholder='Enter Desired Address' ref={originRef} />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Search
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
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