import { MemberCoordinate, PinPoint, PlayingPinPoint } from '@types';
import React from 'react'
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

interface Props {
  coordinate: MemberCoordinate,
  pinPointList: PinPoint[],
  clearedPinPointList: string[],
  openPanel: (pinpoint: PinPoint) => void,
}

const CampaignView = ({ coordinate, pinPointList, clearedPinPointList, openPanel }: Props) => {

  const isCleared = (pid: string) => clearedPinPointList.includes(pid)

  return (

    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{ latitude: coordinate.latitude, longitude: coordinate.longitude, latitudeDelta: 0.004, longitudeDelta: 0.004 }}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      {
        pinPointList.map((p, idx) => (
          <Marker
            key={idx}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
            image={isCleared(p.id) ? require('../../../assets/checkpinpoint.png') : require("../../../assets/bluepinpoint.png")}
            onPress={() => openPanel(p)}
          />
        ))
      }
    </MapView>

  )
}

export default CampaignView;

const styles = StyleSheet.create({
  map: {
    height: '100%'
  },
  //icon
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 20,
    paddingRight: 20
  }
});