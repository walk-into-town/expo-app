import { PinPointComment } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { BadgeButton, PaddingBox, Row, SubTitle, Text3 } from '../../atoms'

interface Props {
    comments: PinPointComment[],
    navToWriteComment: () => void
}

const PinPointCommentBox = ({ comments, navToWriteComment }: Props) => {
    return (
        <PaddingBox style={{ minHeight: 200 }}>
            <Row>
                <SubTitle>댓글 {comments.length}</SubTitle>
                <View style={{ marginLeft: 'auto' }}>
                    <BadgeButton title="댓글 달기" onPress={navToWriteComment} />
                </View>
            </Row>
            {
                comments.map((v, idx) => {
                    <ListItem key={idx}>
                        <Text3>{v.userId}</Text3>
                        <Text3>{v.text}</Text3>
                    </ListItem>
                })
            }
        </PaddingBox>
    )
}

export default PinPointCommentBox
