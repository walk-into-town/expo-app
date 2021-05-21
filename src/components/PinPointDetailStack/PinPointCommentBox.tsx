import { PinPointComment } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BadgeButton, colorCode, LikeIcon, PaddingBox, Row, SubTitle, Text3 } from '../../atoms'

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
                comments.map((v, idx) => (
                    <ListItem key={idx} containerStyle={{ backgroundColor: colorCode.background }}>
                        <Avatar source={{ uri: v.profileImg }} rounded />
                        <ListItem.Content>
                            <Text>{v.nickname} {v.userId}</Text>
                            <Text3>{v.text}</Text3>
                        </ListItem.Content>
                        <TouchableOpacity>
                            <LikeIcon toggle={false} size={15}/>
                        </TouchableOpacity>
                    </ListItem>
                ))
            }
        </PaddingBox>
    )
}

export default PinPointCommentBox
