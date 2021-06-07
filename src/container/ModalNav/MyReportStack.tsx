import { Report } from '@types'
import React, { useEffect, useState } from 'react'
import { View, Text, RefreshControl } from 'react-native'
import { ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { API } from '../../api'
import { Box, colorCode, DefaultAlert, Row, SubTitle, Text3, Title, TitleBadge, WhiteView } from '../../atoms'
import { useAuthContext } from '../../useHook'
import { toCommonDateTime } from '../../util'
import Modal from "react-native-modal"

interface Props {

}

const MyReportStack = (props: Props) => {
    const { auth: { userToken } } = useAuthContext()
    if (userToken === undefined) return <></>

    const [reportList, setReportList] = useState<Report[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [modalVisble, setModalVisble] = useState(false)
    const [report, setReport] = useState<Report>()

    const getReports = () => {
        const init = async () => {
            setRefreshing(true)
            const { result, data, error, errdesc } = await API.getReport(userToken.id)
            setRefreshing(false)
            if (result === "failed" || data === undefined)
                return DefaultAlert({ title: error, subTitle: errdesc })

            setReportList(data)
        }
        init();
    }
    useEffect(() => {
        getReports();
    }, [])

    const onModal = (v: Report) => {
        setModalVisble(true)
        setReport(v)
    }

    const renderType = (r: Report) => r.type === "Campaign" ? "캠페인" : "핀포인트"

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getReports} />}
            showsVerticalScrollIndicator={false}
            style={{ paddingTop: 10 }}
        >
            {
                reportList.length === 0 ?
                    <View style={{ marginTop: "40%", justifyContent: "center", alignItems: "center" }}>
                        <Title style={{ fontSize: 50 }}>텅</Title>
                        <Text3>신고 내역이 없습니다.</Text3>
                    </View>
                    :
                    reportList.map((v, idx) => (
                        <ListItem
                            key={idx}
                            bottomDivider style={{ opacity: v.processed ? .5 : 1, marginHorizontal: 30, marginVertical: 4, borderRadius: 10 }}
                            containerStyle={{ borderRadius: 10 }}
                            onPress={() => onModal(v)}
                        >
                            <ListItem.Content>
                                <Row>
                                    <SubTitle>{v.targetUser}</SubTitle>
                                    <Text style={{ marginBottom: 4 }}>의 {renderType(v)} {v.type === "Campaign" ? "리뷰" : "댓글"}</Text>
                                </Row>
                                <Text3>{v.description}</Text3>
                            </ListItem.Content>

                            <ListItem.Content right>
                                <Text>{v.processed ? "조치완료" : ""}</Text>
                            </ListItem.Content>
                        </ListItem>
                    ))
            }
            <Modal isVisible={modalVisble} onBackdropPress={() => setModalVisble(false)}>
                <WhiteView style={{ borderRadius: 10, paddingVertical: 20, paddingLeft: 20 }}>
                    {
                        report === undefined ? <></>
                            : <>
                                <Box>
                                    <Text style={{ marginBottom: 4, fontWeight: 'bold' }}>신고ID</Text>
                                    <Text3>{report.id}</Text3>
                                </Box>
                                <Box>
                                    <Text style={{ marginBottom: 4, fontWeight: 'bold' }}>{renderType(report)}ID</Text>
                                    <Text3>{report.targetId}</Text3>
                                </Box>
                                <Box>
                                    <Text style={{ marginBottom: 4, fontWeight: 'bold' }}>신고 시간</Text>
                                    <Text3>{toCommonDateTime(report.date)}</Text3>
                                </Box>
                            </>
                    }
                </WhiteView>
            </Modal>
        </ScrollView>

    )
}

export default MyReportStack
