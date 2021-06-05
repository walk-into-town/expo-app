import { MemberCoordinate, PinPoint, PlayingPinPoint } from '@types';
import React, { useState } from 'react'
import { StyleSheet, View, Text, ImageEditor, Image } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Bubble, ClearButton, Container, Ionicons, SubTitle, Title } from '../../atoms';
import { mainNavigation } from '../../useHook/useNavigation';
import PlayingCampaignModal from './PlayingCampaignModal';
import { SwipeablePanel } from 'rn-swipeable-panel'
import PinPointPanel from './PinpointPanel';

interface Props {
  coordinate: MemberCoordinate,
  pinPointList: PinPoint[],
  playingPinPointList: PinPoint[],
  clearedPinPointList: string[],
  isPlaying: boolean,
  openPanel: (pinpoint: PinPoint) => void,
}


const CampaignView = ({ coordinate, pinPointList, playingPinPointList, clearedPinPointList, isPlaying, openPanel }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);


  return (

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{ latitude: coordinate.latitude, longitude: coordinate.longitude, latitudeDelta: 0.004, longitudeDelta: 0.004}}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >

        {
          isPlaying ?
            pinPointList.map((pinPoint, idx) =>
              <Marker
                key={idx}
                coordinate={{ latitude: pinPoint.latitude, longitude: pinPoint.longitude }}
                image={require('../../../assets/bluepinpoint.png')}
                onPress={() => openPanel(pinPoint)}

              />

            ) : playingPinPointList.map((playingPinPoint, idx) =>

                clearedPinPointList.includes(playingPinPoint.id) ? 

                    <Marker
                      key={idx}
                      coordinate={{ latitude: playingPinPoint.latitude, longitude: playingPinPoint.longitude }}
                      image={require('../../../assets/checkpinpoint.png')}
                      onPress={() => openPanel(playingPinPoint)}
                    /> :
                    <Marker
                      key={idx}
                      coordinate={{ latitude: playingPinPoint.latitude, longitude: playingPinPoint.longitude }}
                      image={require('../../../assets/bluepinpoint.png')}
                      onPress={() => openPanel(playingPinPoint)}
                    />


            )
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