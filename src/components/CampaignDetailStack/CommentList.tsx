import { BadgeButtonGroupButtonsProps, UpdateCampaignComment } from '@types'
import { CampaignComment } from '@types'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { BadgeButton, ClearButton, LoadingCircle, Row, SubTitle, BadgeButtonGroup } from '../../atoms'
import Comment from './Comment'

interface Props {
    commentList: CampaignComment[]
    navToWriteComment: (comment: UpdateCampaignComment | null) => void
    onDeleteComment: (coid: string) => void
    refreshing: boolean
}

const CommentList = (props: Props) => {
    const { refreshing } = props;
    const [isOnlyImg, setIsOnlyImg] = useState(false);
    const [commentList, setCommentList] = useState(props.commentList)
    const [filterIdx, setFilterIdx] = useState(0)

    const onOnlyImgToggle = () => {
        if (isOnlyImg) {
            setCommentList([...props.commentList]);
        }
        else {
            const newArr = commentList.filter(v => v.imgs.length > 0)
            setCommentList([...newArr])
        }
        setIsOnlyImg(!isOnlyImg);
    }
    useEffect(() => {
        if (!isOnlyImg)
            filterButtons[filterIdx].func();
    }, [isOnlyImg])

    // sort
    const onSortByTime = () => {
        const newArr = commentList.sort((a: CampaignComment, b: CampaignComment) => {
            return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
        })
        setCommentList([...newArr])
    }
    const onSortByRate = (isHigh: boolean) => {
        const newArr = commentList.sort((a: CampaignComment, b: CampaignComment) => {
            return (b.rated - a.rated) * (isHigh ? 1 : -1);
        })
        setCommentList([...newArr]);
    }

    const filterButtons: BadgeButtonGroupButtonsProps[] = [
        { name: "최신순", func: onSortByTime },
        { name: "별점높은순", func: () => onSortByRate(true) },
        { name: "별점낮은순", func: () => onSortByRate(false) },
    ]

    return (
        <View style={{ backgroundColor: "white", marginTop: 10, paddingHorizontal: 10, minHeight: 300 }}>
            <Row style={{ marginTop: 15, marginLeft: 10 }}>
                <SubTitle>
                    조회된 리뷰 {commentList.length}개
                </SubTitle>
                <View style={{ marginLeft: 'auto', marginRight: 5, marginBottom: 5 }}>
                    <ClearButton title="리뷰 쓰기" onPress={() => props.navToWriteComment(null)} size={15} />
                </View>
            </Row>

            <Row>
                <View style={{ marginRight: 10 }}>
                    <BadgeButton title="사진리뷰만" onPress={onOnlyImgToggle} backgroundToggle={isOnlyImg} />
                </View>
                <BadgeButtonGroup
                    buttons={filterButtons}
                    useFilterIdx={[filterIdx, setFilterIdx]}
                />
            </Row>

            {
                refreshing ?
                    <LoadingCircle />
                    :
                    commentList.map((comment, idx) => (
                        <Comment
                            comment={comment}
                            navToWriteComment={props.navToWriteComment}
                            onDeleteComment={props.onDeleteComment}
                            key={idx}
                        />
                    ))
            }
        </View>
    )
}



export default CommentList
