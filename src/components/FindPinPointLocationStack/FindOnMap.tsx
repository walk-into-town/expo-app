import { Coord, TuseState } from '@types';
import React, { useRef, useState } from 'react'
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { Container, Box } from '../../atoms/elements/layouts';
import { SubTitle } from '../../atoms/elements/texts';
import { Text } from 'react-native-elements';
import { imgPath } from '../../util';
import { Image, Platform } from 'react-native';
import { API } from '../../api';

interface Props {
    coordinate: Coord
    onPressMap: (e: { nativeEvent: { coordinate: any; } }) => void

}

const FindOnMap = ({ coordinate, onPressMap }: Props) => {
    const map = useRef<MapView>(null)
    const [userCoord, setUserCoord] = useState<Coord>({ latitude: 0, longitude: 0 })

    const moveToRegion = (center: Coord) => {
        map.current?.setCamera({ center, zoom: 17 })
    }

    return (
        <Container>
            <Box>
                <SubTitle>지도에서 보기</SubTitle>
            </Box>

            {!userCoord.longitude && !userCoord.latitude && <Text>유저 위치 찾는 중..</Text>}
            <MapView
                ref={map}
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                onUserLocationChange={({ nativeEvent: { coordinate } }) => setUserCoord(coordinate)}
                onMapReady={() => {
                    const init = async () => {
                        if (Platform.OS === 'android')
                            await API.getCoordinate();
                        moveToRegion(userCoord);
                    }
                    init();
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onPress={onPressMap}
                loadingEnabled={true}
            >
                <Marker
                    coordinate={coordinate}
                >
                    <Image source={imgPath.redpinpoint} style={{ height: 30, width: 30 }} />
                </Marker>
            </MapView>
        </Container>
    )
}


export default FindOnMap;