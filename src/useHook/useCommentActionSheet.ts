import { useActionSheet } from '@expo/react-native-action-sheet'
import React from 'react'
import { useAuthContext } from './Auth'

interface Props {
    onDelete: () => void
    onEdit: () => void
    onReport: () => void
    commentUserId: string
}

const useCommentActionSheet = (props: Props) => {
    const { showActionSheetWithOptions } = useActionSheet()
    const { auth: { userToken } } = useAuthContext()

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
                        return props.onDelete();
                    case 1:
                        return props.onEdit();
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
                        return props.onReport()
                    default:
                        break;
                }
            }
        )
    }
    const onAction = () => {
        if (userToken === undefined) return;

        if (userToken.id === props.commentUserId)
            ownerAction();
        else
            userAction();
    }
    return { onAction }
}

export default useCommentActionSheet
