import { PinPointComment, WritePinPointComment } from '@types'
import React from 'react'
import { View } from 'react-native'
import { BadgeButton, Row, SubTitle } from '../../atoms'
import Comment from './Comment'

interface Props {
    comments: PinPointComment[],
    navToWriteComment: (comment: WritePinPointComment | null) => void
    navToReport: (comment: PinPointComment) => void
    deleteComment: (coid: string) => void
    onRate: (coid: string, like: boolean) => void
}

const PinPointCommentBox = ({ comments, navToWriteComment, navToReport, deleteComment, onRate }: Props) => {

    const sortLogic = (a: PinPointComment, b: PinPointComment): number => {
        if (a.rateList.length === b.rateList.length)
            return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()

        return b.rateList.length - a.rateList.length;
    }

    return (
        <View style={{ minHeight: 200 }}>
            <Row style={{ marginHorizontal: 20, marginTop: 10 }}>
                <SubTitle>댓글 {comments.length}</SubTitle>
                <View style={{ marginLeft: 'auto' }}>
                    <BadgeButton title="댓글 달기" onPress={() => navToWriteComment(null)} />
                </View>
            </Row>
            {
                comments
                    .sort(sortLogic)
                    .map((v, idx) => (
                        <Comment key={idx}
                            comment={v}
                            deleteComment={deleteComment}
                            onRate={onRate}
                            navToWriteComment={navToWriteComment}
                            navToReport={navToReport}
                        />
                    ))
            }
        </View>
    )
}

export default PinPointCommentBox
