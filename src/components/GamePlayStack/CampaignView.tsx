import { Coord, PinPoint, TuseState } from '@types';
import React, { useEffect, useRef } from 'react'
import { Pressable } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Camera } from 'react-native-maps';
import { colorCode, Ionicons } from '../../atoms';
import { imgPath } from '../../util';

interface Props {
  location: Coord | undefined
  useUserCoord: TuseState<Coord>
  pinPointList: PinPoint[],
  clearedPinPointList: string[],
  openPanel: (pinpoint: PinPoint) => void,
}

const CampaignView = (props: Props) => {
  const map = useRef<MapView>(null)
  const [userCoord, setUserCoord] = props.useUserCoord

  const isCleared = (pid: string) => props.clearedPinPointList.includes(pid)

  const moveToRegion = (center: Coord) => {
    map.current?.setCamera({ center, zoom: 17 })
  }
  const animateToRegion = (center: Coord) => {
    map.current?.animateCamera({ center, zoom: 17 }, { duration: 300 })
  }

  useEffect(() => {
    if (props.location)
      animateToRegion(props.location)
  }, [props.location])

  return (
    <>
      <MapView
        ref={map}
        style={{ height: '100%' }}
        provider={PROVIDER_GOOGLE}
        onUserLocationChange={({ nativeEvent: { coordinate } }) => setUserCoord(coordinate)}
        onMapReady={() => moveToRegion(userCoord)}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        {
          props.pinPointList.map((p, idx) => (
            <Marker
              key={idx}
              coordinate={{ latitude: p.latitude, longitude: p.longitude }}
              image={isCleared(p.id) ? imgPath.checkpinpoint : imgPath.bluepinpoint}
              onPress={() => props.openPanel(p)}
            />
          ))
        }
      </MapView>
      <Pressable
        onPress={() => animateToRegion(userCoord)}
        style={{ position: "absolute", bottom: 20, right: 20 }}
      >
        <Ionicons name="ios-compass" size={50} color={colorCode.primary} />
      </Pressable>
    </>
  )
}

export default CampaignView;