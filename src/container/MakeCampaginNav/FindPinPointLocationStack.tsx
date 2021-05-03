import React, { useEffect, useState } from 'react';
import { MakeCampaginStackParamList } from '@types'
import { makeCampaginNavigation } from '../../navigation/useNavigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'

import FindPinPointLocation from '../../components/FindPinPointLocationStack/FindPinPointLocation';
import { Container } from '../../atoms/elements/layouts';
import { SubmitButton } from '../../atoms';
import { Alert } from 'react-native';
import * as Location from 'expo-location';



const FindPinPointLocationStack = () => {
    const makeCampaginNav = makeCampaginNavigation();
    const nav = useNavigation();

    const { params: { pinpoint, editIndex } } = useRoute<RouteProp<MakeCampaginStackParamList, 'FindPinPointLocationStack'>>();

    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    useEffect(() => {
        if (pinpoint === undefined) return;

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "핀포인트 위치 수정하기" })

        setLatitude(pinpoint.latitude);
        setLongitude(pinpoint.longitude);
    }, [pinpoint])


    useEffect(() => {
        const getLocation = async () => {
            try {
                await Location.requestPermissionsAsync();
                const { coords } = await Location.getCurrentPositionAsync();
                setLatitude(coords.latitude)
                setLongitude(coords.longitude)
            } catch (error) {
                Alert.alert("Can't find you");
            }
        }
        if (!latitude && !longitude)
            getLocation();
    }, []);



    const onSubmit = async () => {
        if (pinpoint === undefined) return;

        pinpoint.latitude = latitude
        pinpoint.longitude = longitude

        makeCampaginNav.navigate('MakePinPointStack', { pinpoint, editIndex });
    }



    return (
        <Container>
            <FindPinPointLocation
                useLatitude={[latitude, setLatitude]}
                useLongitude={[longitude, setLongitude]}
            />
            <SubmitButton title="핀포인트 위치 추가하기" onPress={onSubmit} />
        </Container>

    )
}

export default FindPinPointLocationStack;