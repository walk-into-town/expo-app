import { CampaignSearchCondition, CampaignSearchType, CampaignSearchTypeText, TuseState } from '@types'
import React, { useState } from 'react'
import { View } from 'react-native'
import { BadgeButton, WhiteTitle } from '../../atoms'
import Modal from 'react-native-modal'

interface Props {
    useType: TuseState<CampaignSearchType>
    useCondition: TuseState<CampaignSearchCondition>
}

const CampaignSortFilter = (props: Props) => {
    const [type, setType] = props.useType;
    const [condition, setCondition] = props.useCondition;
    const [typeModalVisible, setTypeModalVIsible] = useState(false)
    const toggleTypeModal = () => setTypeModalVIsible(!typeModalVisible);

    const typeText: CampaignSearchTypeText = {
        'name': "캠페인이름",
        'region': "지역",
        'id': "캠페인ID",
        'owner': "제작유저"
    }

    const onSelectType = (type: string) => {
        setType(type as CampaignSearchType);
        toggleTypeModal();
    }

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }}>
            <BadgeButton title={`검색조건 - ${typeText[type]}`} onPress={toggleTypeModal} />
            <Modal isVisible={typeModalVisible} avoidKeyboard animationIn={'pulse'} animationOut={'fadeOut'}>
                {Object.keys(typeText).map((v, idx) => {
                    if (v in typeText)
                        return <WhiteTitle onPress={() => onSelectType(v)} key={idx}>{typeText[v]}</WhiteTitle>
                }
                )}
            </Modal>
        </View>
    )
}

export default CampaignSortFilter
