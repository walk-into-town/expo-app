import { useIsFocused } from '@react-navigation/core'
import { RankMember } from '@types'
import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { API } from '../../api'
import { Container, DefaultAlert, LoadingCircle } from '../../atoms'
import Footer from '../../components/Footer'
import MyRankModal from '../../components/RankingStack/MyRankModal'
import OutRankingList from '../../components/RankingStack/OutRankingList'
import RankHeader from '../../components/RankingStack/RankHeader'
import RankingList from '../../components/RankingStack/RankingList'

const RankingStack = () => {
    const [rankList, setRankList] = useState<RankMember[]>([])
    const [outRankList, setOutRankList] = useState<RankMember[]>([])
    const [myRank, setMyRank] = useState<RankMember>()
    const [modalVisible, setModalVisible] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused)
            getRankList()
    }, [isFocused])

    // api
    const getMyRank = async () => {
        const { result, data, error, errdesc } = await API.rankReadMy();
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: error, subTitle: errdesc })
        setMyRank(data)
    }
    const getRankList = async () => {
        const { result, data, error, errdesc } = await API.rankRead("list");
        if (result === "failed" || data === undefined)
            return DefaultAlert({ title: error, subTitle: errdesc })

        setRankList(data.filter(v => v.rank).sort((a: RankMember, b: RankMember) => (a.rank && b.rank) ? a.rank - b.rank : 0))
        setOutRankList(data.filter(v => !v.rank))
    }

    // usecase
    const onRefresh = () => {
        const init = async () => {
            setRefreshing(true)
            await getRankList()
            setRefreshing(false)
        }
        init()
    }
    const onModal = () => {
        const init = async () => {
            await getMyRank()
            setModalVisible(true)
        }
        init()
    }

    return (
        <Container>
            <RankHeader onModal={onModal} />
            <MyRankModal useVisible={[modalVisible, setModalVisible]} myRank={myRank} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {
                    refreshing ? <LoadingCircle />
                        : <>
                            <RankingList rankList={rankList} />
                            <OutRankingList outRankList={outRankList} />
                        </>
                }
                <Footer />
            </ScrollView>
        </Container>
    )
}

export default RankingStack
