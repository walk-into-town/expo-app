import { CampaignComment, UpdateCampaignComment } from '@types'
import React from 'react'
import { Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { Bold, Carousel, colorCode, Gray, RateStarIcon } from '../../atoms'
import { mainNavigation, useCommentActionSheet } from '../../useHook'
import { getPassingText } from '../../util'

interface Props {
    comment: CampaignComment
    navToWriteComment: (comment: UpdateCampaignComment | null) => void
    navToReportComment: (comment: CampaignComment) => void
    onDeleteComment: (coid: string) => void
}

const Comment = (props: Props) => {
    const { comment } = props;

    // useCase
    const { onAction } = useCommentActionSheet({
        commentUserId: comment.userId,
        onEdit: () => props.navToWriteComment({
            rid: comment.id,
            text: comment.text,
            rated: comment.rated,
            imgs: comment.imgs
        }),
        onDelete: () => props.onDeleteComment(comment.id),
        onReport: () => props.navToReportComment(comment)
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
        <Text style={{ marginLeft: 10, marginBottom: 20 }}>{comment.text}</Text>
        <Carousel images={comment.imgs} />
    </View>
}

export default Comment
