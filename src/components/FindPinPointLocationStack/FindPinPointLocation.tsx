import { TuseState } from '@types';
import React from 'react'
import { GooglePlaceSearchBar } from '../../atoms/GoogleMap';

import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { GooglePlaceDetail, GooglePlaceData } from 'react-native-google-places-autocomplete';
import { Container, Box, Googleplace } from '../../atoms/elements/layouts';
import { SubTitle } from '../../atoms/elements/texts';
import { Text } from 'react-native-elements';

const GOOGLE_PLACES_API_KEY = 'AIzaSyA-4i3FV1KLsJbsyVySpYi4YIwxIkEXFlw';

interface Props {
    useLatitude: TuseState<number>,
    useLongitude: TuseState<number>

}

const FindPinPointLocation = (props: Props) => {
    const [latitude, setLatitude] = props.useLatitude;
    const [longitude, setLongitude] = props.useLongitude;

    const onPressMap = (e: { nativeEvent: { coordinate: any; } }) => {
        const { coordinate } = e.nativeEvent
        setLatitude(coordinate.latitude);
        setLongitude(coordinate.longitude);
    }


    const getPlaceDetails = (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
        if (detail === null) return;

        const { geometry: { location } } = detail
        setLatitude(location.lat)
        setLongitude(location.lng)
    }



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

            {!longitude && !latitude && <Text>유저 위치 찾는 중..</Text>}
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
        </Container>
    )
}


export default FindPinPointLocation;