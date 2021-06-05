import { TuseState } from '@types';
import React from 'react'
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { Container, Box } from '../../atoms/elements/layouts';
import { SubTitle } from '../../atoms/elements/texts';
import { Text } from 'react-native-elements';

interface Props {
    // useLatitude: TuseState<number>,
    // useLongitude: TuseState<number>
    latitude: number,
    longitude: number,
    onPressMap:(e: { nativeEvent: { coordinate: any; } }) => void

}

const FindOnMap = ({latitude, longitude, onPressMap}: Props) => {
    // const [latitude, setLatitude] = props.useLatitude;
    // const [longitude, setLongitude] = props.useLongitude;






    return (
        <Container>
            <Box>
                <SubTitle>지도에서 보기</SubTitle>
            </Box>

            {/* {!longitude && !latitude && <Text>유저 위치 찾는 중..</Text>} */}
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                region={{ latitude: latitude, longitude: longitude, latitudeDelta: 0.004, longitudeDelta: 0.004 }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onPress={onPressMap}
            >
                <Marker 
                coordinate={{ latitude: latitude, longitude: longitude }}
                image={require('../../../assets/redpinpoint.png')}
                 />
            </MapView>
        </Container>
    )
}


export default FindOnMap;