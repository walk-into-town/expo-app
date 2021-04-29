import { PinPoint } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { EvilIcons, OutLineButton } from '../../atoms'
import { Box, Row, SubTitle } from '../../atoms/styled'

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
