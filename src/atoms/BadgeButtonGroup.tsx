import { BadgeButtonGroupButtonsProps, TuseState } from '@types'
import React, { useState } from 'react'
import { View } from 'react-native'
import { BadgeButton } from './elements/buttons'
import { Row } from './elements/layouts'

const BadgeButtonGroup = (props: {
    buttons: BadgeButtonGroupButtonsProps[]
    useFilterIdx: TuseState<number>
    disableToggleFristBt?: boolean
}) => {
    // 0은 선택되지 않음
    const [badgeIdx, setBadgeIdx] = props.useFilterIdx

    return (
        <Row>
            {
                props.buttons.map((v, idx) => (
                    <View key={idx} style={{ marginHorizontal: 2 }}>
                        <BadgeButton
                            title={v.name}
                            onPress={() => {
                                setBadgeIdx(idx);
                                v.func();
                            }}
                            backgroundToggle={idx === badgeIdx && !(props.disableToggleFristBt && idx === 0)}
                        />
                    </View>
                ))
            }
        </Row>
    )
}

export default BadgeButtonGroup
