import React, { useEffect, useState } from 'react';
import { Coord, MakeCampaignNavParamList } from '@types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { makeCampaignNavigation } from '../../useHook';

import FindOnMap from '../../components/FindPinPointLocationStack/FindOnMap';
import { SubmitButton, Container } from '../../atoms';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import FindOnGooglePlace from '../../components/FindPinPointLocationStack/FindOnGooglePlace';



const FindPinPointLocationStack = () => {
    const makeCampaignNav = makeCampaignNavigation();
    const nav = useNavigation();

    const { params: { pinpoint, editIndex } } = useRoute<RouteProp<MakeCampaignNavParamList, 'FindPinPointLocationStack'>>();
    if (pinpoint === undefined) return <></>;

    const [coord, setCoord] = useState<Coord>({ latitude: 0, longitude: 0 })

    useEffect(() => {
        if (pinpoint === undefined) return;

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "핀포인트 위치 수정하기" })

        if (pinpoint.latitude !== 0 && pinpoint.longitude !== 0)
            setCoord(pinpoint)

    }, [])

    const getPlaceDetails = (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
        if (detail === null) return;

        const { geometry: { location } } = detail
        setCoord({ latitude: location.lat, longitude: location.lng })
    }



    const onSubmit = () => {
        makeCampaignNav.navigate('MakePinPointStack', {
            pinpoint: {
                id: pinpoint.id,
                description: pinpoint.description,
                imgs: pinpoint.imgs,
                latitude: coord.latitude,
                longitude: coord.longitude,
                name: pinpoint.name,
                quiz: pinpoint.quiz
            }, editIndex
        });
    }

    const onPressMap = (e: { nativeEvent: { coordinate: any; } }) => {
        const { coordinate } = e.nativeEvent
        setCoord(coordinate)
    }


    return (
        <Container>
            <FindOnGooglePlace
                getPlaceDetails={getPlaceDetails}
            />
            <FindOnMap
                coordinate={coord}
                onPressMap={onPressMap}
            />
            <SubmitButton title="핀포인트 위치 추가하기" onPress={onSubmit} />
        </Container>
    )
}

export default FindPinPointLocationStack;