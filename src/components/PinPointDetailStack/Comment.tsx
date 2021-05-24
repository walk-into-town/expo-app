import { PinPointComment, WritePinPointComment } from '@types'
import React from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Bold, colorCode, Gray, LikeIcon, Row, Text3 } from '../../atoms'
import { useCommentActionSheet } from '../../useHook'
import { getPassingTime } from '../../util'
import commingSoon from '../commingSoon'

interface Props {
    comment: PinPointComment
    deleteComment: (coid: string) => void
    onRate: (coid: string, like: boolean) => void
    navToWriteComment: (comment: WritePinPointComment | null) => void
}

const Comment = (props: Props) => {
    const { comment } = props;

    const { onAction } = useCommentActionSheet({
        commentUserId: comment.userId,
        onEdit: () => props.navToWriteComment({
            coid: comment.id,
            imgs: comment.imgs,
            text: comment.text
        }),
        onDelete: () => props.deleteComment(comment.id),
        onReport: () => commingSoon
    })

    const onLiked = () => {
        props.onRate(comment.id, true)
    }

    return (
        <ListItem containerStyle={{ backgroundColor: colorCode.background }}>
            <Avatar source={{ uri: comment.profileImg }} rounded />
            <ListItem.Content>
                <Bold>{comment.nickname}</Bold>
                <Text3 ellipsizeMode={'middle'}>{comment.text}</Text3>
                <Row>
                    <Gray style={{ marginRight: 10 }}>{getPassingTime(comment.updateTime)}</Gray>
                    <Gray>좋아요 {comment.rated}개</Gray>
                </Row>
            </ListItem.Content>
            <TouchableOpacity style={{ marginRight: 10 }} onPress={onLiked}>
                <LikeIcon toggle={false} size={15} />
            </TouchableOpacity>
            <ListItem.Chevron onPress={onAction} color={colorCode.sub} style={{ paddingRight: 5 }} />
        </ListItem>
    )
}

export default Comment
