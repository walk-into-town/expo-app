import { PinPoint } from '@types';
import React, { useState } from 'react'
import { StyleSheet, View, Text, ImageEditor, Image } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Bubble, ClearButton, Container, Ionicons, SubTitle, Title } from '../../atoms';
import { mainNavigation } from '../../useHook/useNavigation';
import PlayingCampaignModal from './PlayingCampaignModal';


interface Props {

}

const dummy: PinPoint = {
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
  comments: [],
  coupons: []

}

const CampaignView = (props: Props) => {
  const mainNav = mainNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [pinPointList, setPinPointList] = useState<PinPoint[]>([dummy]);

  const showCampaignList = () => {
      setModalVisible(true);
  }


  return (
    <Container>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{ latitude: 36.1450104, longitude: 128.3926695, latitudeDelta: 0.004, longitudeDelta: 0.004 }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >

        {
          pinPointList.map((item, idx) =>
            <Marker
              key={idx}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              image={require('../../../assets/bluepinpoint.png')}

            >
              <Callout tooltip onPress={e => mainNav.navigate('GameNav', { screen: "QuizStack" })}>
                <View>
                  <Bubble>
                    <Title>{item.name}</Title>
                    <SubTitle numberOfLines={2}>{item.description}</SubTitle>
                    <Image
                      style={styles.image}
                      source={{ uri: 'https://lh3.googleusercontent.com/i_k933T8nwXJifez6VISbZlZcY6ZSQ9EpK-c3fC7QFxzmrsODERxwylG2AQmChU0RH9NQZu18fTjj5W3iV2O77-qQik' }}
                    />
                    {/* <ClearButton title="퀴즈 풀기" onPress={() => mainNav.navigate('GameNav', { screen: "QuizStack" })} /> */}
                  </Bubble>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>


            </Marker>
          )
        }
        
      </MapView>



      <View style={styles.icon}>
      <PlayingCampaignModal
      />  
      </View>


    </Container>
    
  )
}

export default CampaignView;

const styles = StyleSheet.create({
  map: {
    height: '100%'
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
    fontWeight: 'bold',
  },
  // Character image
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    margin: 8
  },
  //icon
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 20,
    paddingRight: 20
  }
});