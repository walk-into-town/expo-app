
import { MakePinPoint, TuseState } from '@types'
import React from 'react'
import { Text } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Box, Row, SubTitle, OutLineButton, SimpleSwapListItem, ClearButton, Gray } from '../../atoms'

interface Props {
    useRegion: TuseState<string>,
    pinPointList: MakePinPoint[],
    setCampaignRegion: () => void,
    navToPinPointModal: (item?: MakePinPoint, idx?: number) => void,
    deletePinPoint: (idx: number) => void
}

const PinPointListBox = ({ useRegion, pinPointList, setCampaignRegion, navToPinPointModal, deletePinPoint }: Props) => {

    const [region, setRegion] = useRegion

    return (
        <Box>
            <Gray>* 첫번째 핀포인트 위치를 기준으로 캠페인 대표지역을 설정합니다.</Gray>
            <Row>
                <ClearButton
                    title="지역 설정"
                    onPress={() => setCampaignRegion()}
                />
                <Text> {region} </Text>
            </Row>

            <Row>
                <SubTitle>핀포인트 리스트</SubTitle>
                <Button type="clear" titleStyle={{ fontSize: 13, color: "black" }}
                    title="지도에서 보기"
                    onPress={() => console.log("지도에서 보기")}
                />
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

            <Gray style={{ marginTop: 4 }}>* 리스트를 옆으로 슬라이드하면 삭제할 수 있습니다.</Gray>
        </Box>
    )
}

export default PinPointListBox;
