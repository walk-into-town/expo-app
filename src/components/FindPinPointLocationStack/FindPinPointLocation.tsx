import { TuseState } from '@types';
import React, { useState, useEffect } from 'react'
import { Alert} from 'react-native'
import { GooglePlaceSearchBar } from '../../atoms/GoogleMap';

import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { GooglePlaceDetail, GooglePlaceData } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { Container, Box, Googleplace } from '../../atoms/elements/layouts';
import { SubTitle } from '../../atoms/elements/texts';

const GOOGLE_PLACES_API_KEY = 'AIzaSyA-4i3FV1KLsJbsyVySpYi4YIwxIkEXFlw';

interface Props {
    useLatitude: TuseState<number>,
    useLongitude: TuseState<number>

}

const FindPinPointLocation = (props: Props) => {
    const [latitude, setLatitude] = props.useLatitude;
    const [longitude, setLongitude] = props.useLongitude;
    const [userLocation, setUserLocation] = useState(
        {
            loaded: true,
            coordinates: {
                lat: 0,
                lng: 0,
                latDelta: 0.005,
                lngDelta: 0.005
            }
        }
    )


    const getLocation = async () => {
        try {
            await Location.requestPermissionsAsync();
            const { coords } = await Location.getCurrentPositionAsync();
            setUserLocation({
                loaded: true,
                coordinates: {
                    lat: coords.latitude,
                    lng: coords.longitude,
                    latDelta: 0.005,
                    lngDelta: 0.005
                }
            });


        } catch (error) {
            Alert.alert("Can't find you");
        }


    }


    const onPressMap = (e: { nativeEvent: { coordinate: any; } }) => {
        const { coordinate } = e.nativeEvent
        setLatitude(coordinate.latitude);
        setLongitude(coordinate.longitude);
    }


    const getPlaceDetails = (data: GooglePlaceData, detail: GooglePlaceDetail|null) => {
        if (detail === null) return;
        //console.log(detail?.geometry.location)
        const { geometry: { location } } = detail
        setLatitude(location.lat)
        setLongitude(location.lng)
    }

    useEffect(() => {
        getLocation();


    }, []);




    return (

        <Container>
                <Box>
                <SubTitle>위치 검색</SubTitle>
                </Box>
                
            <Googleplace>
                <GooglePlaceSearchBar
                    placeholder='장소 검색'
                    query={{
                        key: GOOGLE_PLACES_API_KEY,
                        language: 'ko'
                    }}
                    onPress={getPlaceDetails}
                    onFail={(error) => console.log(error)}
                    fetchDetails={true}
                />

            </Googleplace>
            <Box>
                <SubTitle>지도에서 보기</SubTitle>
                </Box>

            {(latitude && longitude) ?
                
                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    region={{ latitude: latitude, longitude: longitude, latitudeDelta: 0.004, longitudeDelta: 0.004 }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    onPress={onPressMap}
                >
                    <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
                </MapView>
                : <MapView style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    region={{ latitude: userLocation.coordinates.lat, longitude: userLocation.coordinates.lng, latitudeDelta: 0.004, longitudeDelta: 0.004 }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    onPress={onPressMap}>
                </MapView>




            }
        </Container>



    )
}


export default FindPinPointLocation;