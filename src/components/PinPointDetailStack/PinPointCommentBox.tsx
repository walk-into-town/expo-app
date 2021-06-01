import { PinPointComment, WritePinPointComment } from '@types'
import React from 'react'
import { View } from 'react-native'
import { BadgeButton, Row, SubTitle } from '../../atoms'
import Comment from './Comment'

interface Props {
    comments: PinPointComment[],
    navToWriteComment: (comment: WritePinPointComment | null) => void
    deleteComment: (coid: string) => void
    onRate: (coid: string, like: boolean) => void
}

const PinPointCommentBox = ({ comments, navToWriteComment, deleteComment, onRate }: Props) => {

    return (
        <View style={{ minHeight: 200 }}>
            <Row style={{ marginHorizontal: 20, marginTop: 10 }}>
                <SubTitle>댓글 {comments.length}</SubTitle>
                <View style={{ marginLeft: 'auto' }}>
                    <BadgeButton title="댓글 달기" onPress={() => navToWriteComment(null)} />
                </View>
            </Row>
            {
                comments.map((v, idx) => <Comment key={idx}
                    comment={v}
                    deleteComment={deleteComment}
                    onRate={onRate}
                    navToWriteComment={navToWriteComment}
                />)
            }
        </View>
    )
}

export default PinPointCommentBox
