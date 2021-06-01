import React, { useEffect, useState } from 'react';
import { MakeCampaignNavParamList } from '@types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { makeCampaignNavigation } from '../../useHook';

import FindOnMap from '../../components/FindPinPointLocationStack/FindOnMap';
import { SubmitButton, Container } from '../../atoms';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import FindOnGooglePlace from '../../components/FindPinPointLocationStack/FindOnGooglePlace';



const FindPinPointLocationStack = () => {
    const makeCampaignNav = makeCampaignNavigation();
    const nav = useNavigation();

    const { params: { pinpoint, editIndex } } = useRoute<RouteProp<MakeCampaignNavParamList, 'FindPinPointLocationStack'>>();

    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    useEffect(() => {
        if (pinpoint === undefined) return;

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "핀포인트 위치 수정하기" })

        setLatitude(pinpoint.latitude);
        setLongitude(pinpoint.longitude);
    }, [pinpoint])


    useEffect(() => {
        //clean up을 위한 변수
        let isEnd = false;
        const getLocation = async () => {
            try {
                await Location.requestPermissionsAsync();
                const { coords } = await Location.getCurrentPositionAsync();
                if (!isEnd) {
                    setLatitude(coords.latitude)
                    setLongitude(coords.longitude)
                }

            } catch (error) {
                if (!isEnd) {
                    Alert.alert("Can't find you");
                }

            }
        }
        if (!latitude && !longitude)
            getLocation();

        return () => { isEnd = true }
    }, []);


    const getPlaceDetails = (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
        if (detail === null) return;

        const { geometry: { location } } = detail
        setLatitude(location.lat)
        setLongitude(location.lng)
    }



    const onSubmit = async () => {
        if (pinpoint === undefined) return;

        pinpoint.latitude = latitude
        pinpoint.longitude = longitude

        makeCampaignNav.navigate('MakePinPointStack', { pinpoint, editIndex });
    }



    return (
        <Container>
            <FindOnGooglePlace
                getPlaceDetails={getPlaceDetails}
            />
            <FindOnMap
                useLatitude={[latitude, setLatitude]}
                useLongitude={[longitude, setLongitude]}
            />
            <SubmitButton title="핀포인트 위치 추가하기" onPress={onSubmit} />
        </Container>
    )
}

export default FindPinPointLocationStack;