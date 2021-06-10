import React from 'react'
import { View } from 'react-native'
import { ConfirmAlert } from '../../atoms';
import { DefaultListItem } from '../../atoms/elements/listItems'
import { mainNavigation } from '../../useHook';
import commingSoon from '../commingSoon';
import Footer from '../Footer';

interface Props {
    onWithdrawal: () => void
}

const Settings = (props: Props) => {

    const mainNav = mainNavigation();

    const navToNyanCat = () => mainNav.navigate("GameNav", { screen: "NyanCat" })
    const onWithdrawal = () => {
        ConfirmAlert({
            title: "정말로 탈퇴하시겠습니까?",
            subTitle: "회원님 ID로 다시 회원가입을 할 수 없습니다.",
            onConfirm: props.onWithdrawal
        })
    }


    return (
        <View style={{ marginVertical: 10 }}>
            <DefaultListItem title="공지사항" onPress={commingSoon} />
            <DefaultListItem title="이벤트" onPress={navToNyanCat} />
            <DefaultListItem title="약관 및 정책" onPress={commingSoon} />
            <DefaultListItem title="회원탈퇴" onPress={onWithdrawal} />
            <DefaultListItem title="현재 버전 1.0.1" onPress={commingSoon} />

            <Footer />
        </View>
    )
}

export default Settings
