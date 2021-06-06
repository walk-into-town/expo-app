import React from 'react'
import { View } from 'react-native'
import { DefaultListItem } from '../../atoms/elements/listItems'
import { mainNavigation } from '../../useHook';
import commingSoon from '../commingSoon';
import Footer from '../Footer';

interface Props {

}

const Settings = (props: Props) => {

    const mainNav = mainNavigation();

    const navToNyanCat = () => mainNav.navigate("GameNav", { screen: "NyanCat" })

    return (
        <View style={{ marginVertical: 10 }}>
            <DefaultListItem title="공지사항" onPress={commingSoon} />
            <DefaultListItem title="이벤트" onPress={navToNyanCat} />
            <DefaultListItem title="약관 및 정책" onPress={commingSoon} />
            <DefaultListItem title="회원탈퇴" onPress={commingSoon} />
            <DefaultListItem title="현재 버전 0.27.0" onPress={commingSoon} />

            <Footer />
        </View>
    )
}

export default Settings
