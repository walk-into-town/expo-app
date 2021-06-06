import React from 'react'
import { Image, ScrollView } from 'react-native'
import { Card, Divider, ListItem, Text } from 'react-native-elements'
import { colorCode, SubTitle, Text3, WhiteView } from '../../atoms'
import { useAuthContext } from '../../useHook'

interface Props {
    badgeList: string[]
}

const BadgeList = (props: Props) => {
    const { auth: { userToken } } = useAuthContext();
    if (userToken === undefined) return <></>

    return (
        <WhiteView style={{ marginVertical: 10 }}>
            <ListItem>
                <ListItem.Content style={{ alignItems: "center" }}>
                    <SubTitle><Text style={{ color: colorCode.primary }}>{userToken.id}</Text> 님의 컬렉션</SubTitle>
                </ListItem.Content>
            </ListItem>

            <Divider />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 90 }}>
                {
                    props.badgeList.length === 0 ?
                        <Text3 style={{ marginTop: 8, marginLeft: 20 }}>빨리 모험을 떠나 컬렉션을 모아보세요!</Text3>
                        : props.badgeList.map((v, idx) => (
                            <Image
                                key={idx}
                                source={{ uri: v }}
                                style={{ width: 80, height: 80, marginBottom: 10, marginRight: 4 }}
                            />
                        ))
                }
            </ScrollView>
        </WhiteView>
    )
}

export default BadgeList
