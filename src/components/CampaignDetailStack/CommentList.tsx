import { CampaignComment } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { BadgeButton, Row, SubTitle } from '../../atoms'
import Comment from './Comment'

interface Props {
    commentList: CampaignComment[]
}

const CommentList = ({ commentList }: Props) => {
    return (
        <View style={{ backgroundColor: "white", marginTop: 10, paddingHorizontal: 10 }}>
            <Row style={{ marginTop: 10 }}>
                <SubTitle>
                    최근 리뷰 {commentList.length}개
                </SubTitle>
                <View style={{ marginLeft: 'auto', marginRight: 5 }}>
                    <BadgeButton title="리뷰 쓰기" onPress={() => { }} />
                </View>
            </Row>

            <Text>(토글)사진리뷰만  최신순/별점높은순/별점낮은순</Text>

            {
                commentList.map((comment, idx) => <Comment comment={comment} key={idx} />)
            }
        </View>
    )
}

export default CommentList
