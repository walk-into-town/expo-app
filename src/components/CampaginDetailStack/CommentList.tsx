import { CampaginComment } from '@types'
import React from 'react'
import { View, Text } from 'react-native'
import { SubTitle } from '../../atoms'
import Comment from './Comment'

interface Props {
    commentList: CampaginComment[]
}

const CommentList = ({ commentList }: Props) => {
    return (
        <View style={{ backgroundColor: "white", marginTop: 10, paddingHorizontal: 10 }}>
            <SubTitle style={{ marginVertical: 20 }}>
                최근 리뷰 {commentList.length}개
            </SubTitle>
            <Text>(토글)사진리뷰만  최신순/별점높은순/별점낮은순</Text>

            {
                commentList.map(comment => <Comment comment={comment}/>)
            }
        </View>
    )
}

export default CommentList
