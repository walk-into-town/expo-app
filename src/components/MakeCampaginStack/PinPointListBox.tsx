import { PinPoint, TuseState } from '@types'
import axios from 'axios'
import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import useAxios from '../../useHook/useAxios'
import { Box, Row, SubTitle, EvilIcons, OutLineButton, SimpleSwapListItem, ClearButton } from '../../atoms'


interface Props {
    useRegion: TuseState<string>,
    pinPointList: PinPoint[],
    setCampaignRegion: () => void,
    navToPinPointModal: (item?: PinPoint, idx?: number) => void,
    deletePinPoint: (idx: number) => void
}

const PinPointListBox = ({ useRegion, pinPointList, setCampaignRegion, navToPinPointModal, deletePinPoint }: Props) => {

    // const [campaignRegion, setCampaignRegion] = useRegion



    return (
        <Box>
            <Row>
                <ClearButton
                    title="지역 설정"
                    onPress={setCampaignRegion}
                />
                <Text>{useRegion}</Text>
            </Row>
            <Row>
                <SubTitle>핀포인트 리스트</SubTitle>
                <Button type="clear" titleStyle={{ fontSize: 13, color: "black" }}
                    title="지도에서 보기"
                    onPress={() => console.log("지도에서 보기")} />
            </Row>
            {
                pinPointList.map((item, idx) =>
                    <SimpleSwapListItem 
                        key={idx}
                        text={item.name} 
                        onText={() => navToPinPointModal(item, idx)} 
                        onDelete={() => deletePinPoint(idx)}
                    />
                )
            }
            <OutLineButton
                title="핀포인트 추가"
                onPress={() => navToPinPointModal()}
                style={{ marginTop: 10 }}
            />
        </Box>
    )
}

export default PinPointListBox;
