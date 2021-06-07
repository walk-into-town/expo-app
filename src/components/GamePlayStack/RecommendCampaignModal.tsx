import React, { useState } from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { BtsWrapper, Container } from '../../atoms/elements/layouts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons, Title } from '../../atoms';
import { ListItem } from 'react-native-elements';
import { Campaign } from '@types';


interface Props {
    recommendCampaignList: Campaign[],
    getRecommendCampaign: () => Promise<void>,

}


const RecommendCampaignModal = ({ recommendCampaignList, getRecommendCampaign }: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const showCampaignList = () => {
        getRecommendCampaign()
        setModalVisible(true);
    }

    return (
        <Container>
            <View>
                <TouchableOpacity activeOpacity={0.7} onPress={showCampaignList}>
                    <Ionicons name="thumbs-up" size={40} color="#00c3ff" />
                </TouchableOpacity>
            </View>


            <Modal
                isVisible={isModalVisible}
                animationIn="zoomIn"
                animationOut="fadeOut"
                backdropOpacity={0.5}
            >

                <View style={styles.modalContainer}>
                    <Title style={{ marginTop: 10 }}>추천 캠페인 목록</Title>
                    {
                        recommendCampaignList === undefined || recommendCampaignList.length === 0 ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Title>텅</Title>
                            </View> :


                            <ScrollView style={{ marginTop: 10 }}>
                                {


                                    recommendCampaignList.map((campaign, idx) =>

                                        <ListItem key={idx}>
                                            {

                                                <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("aaa")}>
                                                    <ListItem.Content>
                                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{campaign.name}</Text>
                                                        <Text>{campaign.region}</Text>
                                                    </ListItem.Content>
                                                </TouchableOpacity>
                                            }



                                        </ListItem>
                                    )
                                }


                            </ScrollView>

                    }
                </View>


                <TouchableOpacity onPress={toggleModal} style={{ alignSelf: 'center', marginTop: 20 }}>
                    <FontAwesome name="close" color={"#FFF"} size={40} />
                </TouchableOpacity>





            </Modal>
        </Container>

    )

}


export default RecommendCampaignModal;

const styles = StyleSheet.create({
    modalContainer: {
        width: '80%',
        height: '70%',
        marginTop: 80,
        alignSelf: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    }
})
