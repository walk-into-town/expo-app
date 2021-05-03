import React from 'react';
import { TuseState } from '@types';
import { GooglePlaceSearchBar } from '../../atoms/GoogleMap';
import { GooglePlaceDetail, GooglePlaceData } from 'react-native-google-places-autocomplete';
import { Container, Box, Googleplace } from '../../atoms/elements/layouts';
import { SubTitle } from '../../atoms/elements/texts';

const GOOGLE_PLACES_API_KEY = 'AIzaSyA-4i3FV1KLsJbsyVySpYi4YIwxIkEXFlw';


interface Props {
    getPlaceDetails: (data: GooglePlaceData, detail: GooglePlaceDetail | null) => void

}

const FindOnGooglePlace = (props: Props) => {
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
                onPress={props.getPlaceDetails}
                onFail={(error) => console.log(error)}
                fetchDetails={true}
            />
        </Googleplace>
    </Container>
    )



}

export default FindOnGooglePlace;