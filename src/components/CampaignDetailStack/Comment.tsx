import { useActionSheet } from '@expo/react-native-action-sheet'
import { CampaignComment, WriteCampaignComment } from '@types'
import React from 'react'
import { Text, StyleProp, TextStyle, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Bold, colorCode, Gray, RateStarIcon, Row } from '../../atoms'
import { useAuthContext } from '../../useHook'
import { getPassingText } from '../../util'

interface Props {
    comment: CampaignComment
    navToWriteComment: (comment: WriteCampaignComment | null) => void
    onDeleteComment: (coid: string) => void
}

const Comment = (props: Props) => {
    const { comment } = props;
    const { showActionSheetWithOptions } = useActionSheet()
    const { auth: { userToken } } = useAuthContext()
    if (userToken === undefined) return <>userToken error</>

    // useCase
    const ownerAction = () => {
        showActionSheetWithOptions(
            {
                options: ["삭제", "수정", "취소"],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 0,
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        return props.onDeleteComment(comment.id)
                    case 1:
                        return props.navToWriteComment({
                            coid: comment.id,
                            text: comment.text,
                            rated: comment.rated,
                            imgs: comment.imgs,
                        })
                    default:
                        break;
                }
            }
        )
    }
    const userAction = () => {
        showActionSheetWithOptions(
            {
                options: ["신고", "취소"],
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0,
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        return props.onDeleteComment(comment.id)
                    default:
                        break;
                }
            }
        )
    }
    const onChevron = () => {
        if (userToken.id === comment.userId)
            ownerAction();
        else
            userAction();
    }

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
                onPress={onChevron}
            />
        </ListItem>
        <Text style={{ marginLeft: 10 }}>{comment.text}</Text>
    </View>
}

export default Comment
