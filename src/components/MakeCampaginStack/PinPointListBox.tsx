import { PinPoint } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Box, Row, SubTitle, EvilIcons, OutLineButton, SimpleSwapListItem } from '../../atoms'

interface Props {
    pinPointList: PinPoint[],
    navToPinPointModal: (item?: PinPoint, idx?: number) => void,
    deletePinPoint: (idx: number) => void
}

const PinPointListBox = ({ pinPointList, navToPinPointModal, deletePinPoint }: Props) => {
    return (
        <Box>
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
