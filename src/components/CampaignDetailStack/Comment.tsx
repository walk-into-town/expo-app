import { CampaignComment, WriteCampaignComment } from '@types'
import React from 'react'
import { Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { Bold, colorCode, Gray, RateStarIcon } from '../../atoms'
import { useCommentActionSheet } from '../../useHook'
import { getPassingText } from '../../util'
import commingSoon from '../commingSoon'

interface Props {
    comment: CampaignComment
    navToWriteComment: (comment: WriteCampaignComment | null) => void
    onDeleteComment: (coid: string) => void
}

const Comment = (props: Props) => {
    const { comment } = props;

    // useCase
    const { onAction } = useCommentActionSheet({
        commentUserId: comment.userId,
        onEdit: () => props.navToWriteComment({
            coid: comment.id,
            text: comment.text,
            rated: comment.rated,
            imgs: comment.imgs
        }),
        onDelete: () => props.onDeleteComment(comment.id),
        onReport: commingSoon
    });

    // render
    const renderUserId = (uid: string) => (
        uid.slice(0, 3) + "*".repeat(uid.slice(3).length)
    )
    const renderStars = (rated: number) => {
        return [...Array(5)].map((_, idx) => (
            <RateStarIcon key={idx} toggle={idx < rated} />)
        )
    }

    return <View style={{ marginVertical: 10 }}>
        <ListItem>
            <Avatar source={{ uri: comment.profileImg }} rounded />
            <ListItem.Content>
                <Text><Bold>{comment.nickname}</Bold> ({renderUserId(comment.userId)})</Text>
                <Text>{renderStars(comment.rated)} <Gray>{getPassingText(comment.updateTime)}</Gray></Text>
            </ListItem.Content>
            <ListItem.Chevron
                color={colorCode.sub}
                onPress={onAction}
            />
        </ListItem>
        <Text style={{ marginLeft: 10 }}>{comment.text}</Text>
    </View>
}

export default Comment
