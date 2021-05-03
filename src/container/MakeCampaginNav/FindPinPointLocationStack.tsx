import React, { useEffect, useState } from 'react';
import { PinPoint, quizType, MakeCampaginStackParamList } from '@types'
import { makeCampaginNavigation } from '../../navigation/useNavigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import SubmitPinPointLocationButton from '../../components/FindPinPointLocationStack/SubmitPinPointLocationButton';
import FindPinPointLocation from '../../components/FindPinPointLocationStack/FindPinPointLocation';
import { Container } from '../../atoms/elements/layouts';



const FindPinPointLocationStack = () => {
    const makeCampaginNav = makeCampaginNavigation();
    const nav = useNavigation();

    const { params: { pinpoint, editIndex } } = useRoute<RouteProp<MakeCampaginStackParamList, 'FindPinPointLocationStack'>>();
    
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    useEffect(()=>{
        if (pinpoint === undefined) return;

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "핀포인트 위치 수정하기" })

        // if (lat=== undefined || long === undefined) return;

        // if (lat !== undefined || long !== undefined) nav.setOptions({ headerTitle: "핀포인트 위치 수정하기" })

        setLatitude(pinpoint.latitude);
        setLongitude(pinpoint.longitude);


    },[pinpoint])




    const onSubmit = async () => {
        if (pinpoint === undefined) return;
        pinpoint.latitude = latitude
        pinpoint.longitude = longitude

        makeCampaginNav.navigate('MakePinPointStack', {pinpoint, editIndex});
    }


    


    return (

        <Container>
            <FindPinPointLocation
            useLatitude={[latitude,setLatitude]}
            useLongitude={[longitude,setLongitude]}


            />
            <SubmitPinPointLocationButton onSubmit={onSubmit}/>
        </Container>




    )
}

export default FindPinPointLocationStack;