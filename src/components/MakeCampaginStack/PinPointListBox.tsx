import { PinPoint } from '@types'
import axios from 'axios'
import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Box, Row, SubTitle, EvilIcons, OutLineButton, ClearButton } from '../../atoms'
import useAxios from '../../useHook/useAxios'

interface Props {
    pinPointList: PinPoint[],
    navToPinPointModal: (item?: PinPoint, idx?: number) => void,
    deletePinPoint: (idx: number) => void
}

const PinPointListBox = ({ pinPointList, navToPinPointModal, deletePinPoint }: Props) => {
    const setCampaignLocation = async ()=>{
        if(pinPointList!==undefined){
            const lat = pinPointList[0].latitude
            const long = pinPointList[0].longitude
            const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&language=ko&key=AIzaSyA-4i3FV1KLsJbsyVySpYi4YIwxIkEXFlw`);
            console.log(data);
        }

        else Alert.alert('핀포인트 먼저 설정해주세요')
            
    }

    return (
        <Box>
            <Row>
                <ClearButton
                    title="지역 설정"
                    onPress={setCampaignLocation}
                />
                <Text></Text>
            </Row>
            <Row>
                <SubTitle>핀포인트 리스트</SubTitle>
                <Button type="clear" titleStyle={{ fontSize: 13, color: "black" }}
                    title="지도에서 보기"
                    onPress={() => console.log("지도에서 보기")} />
            </Row>
            {pinPointList.map((item, idx) =>
                <Row key={idx} style={{ height: 50 }}>
                    <Text
                        style={{ fontSize: 18, paddingHorizontal: 20 }}
                        onPress={() => navToPinPointModal(item, idx)}>
                        {item.name}
                    </Text>
                    <Text>{item.latitude} {item.longitude}</Text>
                    <EvilIcons
                        style={{ marginLeft: 'auto', marginRight: 16 }}
                        name="close"
                        onPress={() => deletePinPoint(idx)} size={20} />
                </Row>
            )}
            <OutLineButton
                title="핀포인트 추가"
                onPress={() => navToPinPointModal()}
            />
        </Box>
    )
}

export default PinPointListBox;
