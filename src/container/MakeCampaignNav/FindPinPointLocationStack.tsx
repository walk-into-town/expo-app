import React, { useEffect, useState } from 'react';
import { MakeCampaignNavParamList } from '@types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { makeCampaignNavigation, useAuthContext } from '../../useHook';

import FindOnMap from '../../components/FindPinPointLocationStack/FindOnMap';
import { SubmitButton, Container } from '../../atoms';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import FindOnGooglePlace from '../../components/FindPinPointLocationStack/FindOnGooglePlace';



const FindPinPointLocationStack = () => {
    const makeCampaignNav = makeCampaignNavigation();
    const nav = useNavigation();
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <></>

    const { params: { pinpoint, editIndex } } = useRoute<RouteProp<MakeCampaignNavParamList, 'FindPinPointLocationStack'>>();
    if (pinpoint === undefined) return <></>;

    const [latitude, setLatitude] = useState<number>(userToken.coords.latitude);
    const [longitude, setLongitude] = useState<number>(userToken.coords.longitude);

    useEffect(() => {
        if (pinpoint === undefined) return;

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "핀포인트 위치 수정하기" })

        if (pinpoint.latitude !== 0 && pinpoint.longitude !== 0) {
            setLatitude(pinpoint.latitude);
            setLongitude(pinpoint.longitude);
        }

    }, [])


    // useEffect(() => {
    //     //clean up을 위한 변수
    //     let isEnd = false;
    //     const getLocation = async () => {
    //         try {
    //             await Location.requestPermissionsAsync();
    //             const { coords } = await Location.getCurrentPositionAsync();
    //             if (!isEnd) {
    //                 setLatitude(coords.latitude)
    //                 setLongitude(coords.longitude)
    //             }

    //         } catch (error) {
    //             if (!isEnd) {
    //                 Alert.alert("Can't find you");
    //             }

    //         }
    //     }
    //     if (!latitude && !longitude)
    //         getLocation();

    //     return () => { isEnd = true }
    // }, []);


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

    const onPressMap = (e: { nativeEvent: { coordinate: any; } }) => {
        const { coordinate } = e.nativeEvent
        setLatitude(coordinate.latitude);
        setLongitude(coordinate.longitude);
    }


    return (
        <Container>
            <FindOnGooglePlace
                getPlaceDetails={getPlaceDetails}
            />
            <FindOnMap
                // useLatitude={[latitude, setLatitude]}
                // useLongitude={[longitude, setLongitude]}
                latitude={latitude}
                longitude={longitude}
                onPressMap={onPressMap}
            />
            <SubmitButton title="핀포인트 위치 추가하기" onPress={onSubmit} />
        </Container>
    )
}

export default FindPinPointLocationStack;