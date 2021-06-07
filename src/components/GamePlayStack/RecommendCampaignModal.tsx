import { SearchCampaign } from '@types';
import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { colorCode, FontAwesome, Ionicons, Text1, Title, WhiteView } from '../../atoms'
import { getDummySearchCampaign } from '../../util';

interface Props {
    recommendCampaignList: SearchCampaign[]
    getRecommendCampaign: () => Promise<void>
    navtoCampaignDetail: (campaign: SearchCampaign) => void
}

const RecommendCampaignModal = (props: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        props.getRecommendCampaign();
        setModalVisible(!isModalVisible);
    }
    const closeModal = () => setModalVisible(false);


    return (
        <View style={{ position: 'absolute', top: 60, right: 12 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={openModal}>
                <Ionicons name="md-bookmark" size={35} color={colorCode.primary} />
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                animationIn="zoomIn"
                animationOut="fadeOut"
                backdropOpacity={0.5}
                onBackdropPress={closeModal}
            >
                <WhiteView style={styles.modalContainer}>
                    <Title>추천 캠페인 목록</Title>
                    <Text1 style={{ fontSize: 10, marginVertical: 4 }}>* 가깝고 평가가 좋은 핀포인트 10개를 추천해줍니다.</Text1>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ height: "100%" }}>
                        {
                            props.recommendCampaignList.map((v, idx) => (
                                <ListItem key={idx}
                                    onPress={() => { props.navtoCampaignDetail(getDummySearchCampaign(v.id)); closeModal(); }}
                                    style={{ borderRadius: 20, marginVertical: 4 }}
                                    containerStyle={{ borderWidth: 1, borderColor: colorCode.primary, borderRadius: 20 }}
                                >
                                    <ListItem.Content>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{v.name}</Text>
                                        <Text>{v.region}</Text>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                    </ScrollView>
                </WhiteView>
                <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'center', marginTop: 20 }}>
                    <FontAwesome name="close" color={"#FFF"} size={40} />
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default RecommendCampaignModal

const styles = StyleSheet.create({
    modalContainer: {
        width: '90%',
        height: '80%',
        marginTop: 80,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    }
})
