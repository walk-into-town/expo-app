import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/core';
import { PinPoint, CampaginStackParamList } from '@types';
import { Button, Input, Text } from 'react-native-elements'
import { campaginNavigation, mainNavigation } from '../../navigation/useNavigation';
import { OutLineButton, ImgPicker, InputModal, EvilIcons } from '../../atoms';
import { SubTitle, ScrollWrapper, Box, Row } from '../../atoms/styled';


const MakeCampagin = () => {
    const { params: { pinpoint, editIndex } } = useRoute<RouteProp<CampaginStackParamList, 'MakeCampagin'>>();

    const mainNav = mainNavigation();
    const campaginNav = campaginNavigation();

    const [title, setTitle] = useState("");
    const [campaginImgs, setCampaginImgs] = useState<string[]>([]);
    const [depiction, setDepiction] = useState("");

    const [pinPointList, setPinPointList] = useState<PinPoint[]>([]);
    const [couponList, setCouponList] = useState([]);
    // react native multipart/form-data ajax

    useEffect(() => {
        if (pinpoint === undefined) return;

        setPinPointList(editIndex !== undefined ? [...pinPointList.slice(0, editIndex), pinpoint, ...pinPointList.splice(editIndex + 1)]
            : [...pinPointList, pinpoint])

    }, [pinpoint])

    const navToPinPointModal = (item: PinPoint, idx: number) => {
        mainNav.navigate("ModalStack", { screen: 'MakePinPointModal', params: { pinpoint: item, editIndex: idx } })
    }
    const deletePinPoint = (idx: number) => {
        setPinPointList([...pinPointList.slice(0, idx), ...pinPointList.slice(idx + 1)])
    }
    const submit = () => {
        campaginNav.navigate("Campagin");
    }

    return (
        <ScrollWrapper>
            <Box>
                <InputModal useText={[title, setTitle]} placeholder="캠페인 제목을 입력해주세요" />

                <ImgPicker useImgs={[campaginImgs, setCampaginImgs]} />

                <InputModal
                    useText={[depiction, setDepiction]}
                    placeholder="캠페인 설명을 입력해주세요."
                    type="textarea"
                />

                <Input placeholder="지역 설정" />
            </Box>

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
                    onPress={() => mainNav.navigate("ModalStack", { screen: 'MakePinPointModal', params: {} })}
                />
            </Box>

            <Box>
                <SubTitle>쿠폰 리스트</SubTitle>
                <OutLineButton
                    title="쿠폰 추가"
                    onPress={() => mainNav.navigate("ModalStack", { screen: 'MakeCouponModal', params: {} })}
                />
            </Box>

            <Button
                title="캠페인 만들기"
                onPress={submit}
                style={{ marginTop: 20 }}
                titleStyle={{ fontFamily: "SCDream7" }}
            />
        </ScrollWrapper>
    )
}

export default MakeCampagin;
