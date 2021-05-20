import { PinPoint } from '@types';
import React, { useState } from 'react'
import {StyleSheet, View, Text, ImageEditor} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Container } from '../../atoms';


interface Props {

}

const dummy : PinPoint = {
        id: "aaaa",
        name: "금오공대 분수대",
        imgs: ["a"],
        latitude: 36.146486,
        longitude: 128.393817,
        updateTime: new Date().toISOString(),
        description: "원자모양을 한 분수대",

        quiz: {
            text: "바보바보바보바보",
            type: "주관식",
            choices: [],
            answer: "ㅁㅁㅁㅁㅁㅁ"
        },
        comments: [{
            id: "",
            userId: "",
            text: "",
            imgs: []
        }]

}

const CampaignView = (props: Props) => {

  const [pinPointList, setPinPointList] = useState<PinPoint[]>([dummy]);


    return (
        <Container>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                region={{ latitude: 36.1450104, longitude: 128.3926695, latitudeDelta: 0.004, longitudeDelta: 0.004 }}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >

              {
                pinPointList.map((item, idx)=>
                  <Marker coordinate={{latitude:item.latitude, longitude:item.longitude}}>
                    <Callout>
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.name}>
                          {item.name}
                        </Text>
                        <Text>
                          {item.description}
                        </Text>

                      </View>
                    </View>
                    </Callout>


                  </Marker>
                )
              }
            </MapView>

        </Container>
    )
}

export default CampaignView;

const styles = StyleSheet.create({
    map: {
      height: '100%'
    },
    // Callout bubble
    bubble: {
      flexDirection: 'column',
      alignSelf: 'flex-start',
      backgroundColor: '#fff',
      borderRadius: 6,
      borderColor: '#ccc',
      borderWidth: 0.5,
      padding: 15,
      width: 150,
    },
    // Arrow below the bubble
    arrow: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#fff',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -32,
    },
    arrowBorder: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#007a87',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -0.5,
      // marginBottom: -15
    },
    // Character name
    name: {
      fontSize: 16,
      marginBottom: 5,
    },
    // Character image
    image: {
      width: "100%",
      height: 80,
    },
  });