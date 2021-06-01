import React, { useState } from 'react'
import { Image, Text, Dimensions, View } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel'
import { PinPoint, TuseState } from '@types'
import { AbsoluteCousel, ClearButton, Row, SubTitle, Title } from '../../atoms';


interface Props {
    usePanelActivie: TuseState<boolean>,
    pinPoint: PinPoint | undefined,
    navtoPinPointDetail: (pinpoint: PinPoint) => void
}

const PinPointPanel = ({ usePanelActivie, pinPoint, navtoPinPointDetail }: Props) => {
    // const [pinPoint, setPinPoint] = pinPoint
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        onlySmall: true
    });
    const [isPanelActive, setIsPanelActive] = usePanelActivie

    const closePanel = () => {
        setIsPanelActive(false);
    };
    const pageWidth = Math.round(Dimensions.get('window').width);

    return (
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>

            {
                pinPoint === undefined ? <Title>텅</Title> :

                    <View style={{flex:1, marginTop: 25 }}>

                        {/* <AbsoluteCousel images={["https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MTVfMTYg%2FMDAxNjIxMDEyMjA3NDA2.ItqcEYQylMRkiJ7t4-BfieTBnJ4XS9O8z2B0Zc04CVMg.VXRVIxHyZD4zTIqoIZRdEAuNnGvebv2LL0SbcuD_aAEg.JPEG.eunju_8783%2FIMG_5967.jpg&type=sc960_832", "https://i.ytimg.com/vi/IdMIqWnRpLg/maxresdefault.jpg"]}/> */}
                        <Image
                            source={{ uri: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MTVfMTYg%2FMDAxNjIxMDEyMjA3NDA2.ItqcEYQylMRkiJ7t4-BfieTBnJ4XS9O8z2B0Zc04CVMg.VXRVIxHyZD4zTIqoIZRdEAuNnGvebv2LL0SbcuD_aAEg.JPEG.eunju_8783%2FIMG_5967.jpg&type=sc960_832"  }}
                            style={{
                                width: pageWidth,
                                height: "150%",
                                position:'absolute',
                                resizeMode: 'stretch'
                            }} />

                        <Title style={{ alignSelf: 'flex-start', color: 'white',  marginTop: 20, fontSize: 30}}>{pinPoint.name}</Title>
                        <SubTitle style={{ alignSelf: 'flex-start', color: 'white', marginTop: 5, fontSize: 15 }} numberOfLines={1}>역사와 전통을 가진 금오공고!</SubTitle>
                        <Row style={{ alignSelf: 'center', marginTop: 50}}>
                        <ClearButton color='white' title="핀포인트 상세" onPress={()=>navtoPinPointDetail(pinPoint)}/>
                        <ClearButton color='white' title="퀴즈 GOGO"/>
                        </Row>
                        
                        
                    </View>

            }





        </SwipeablePanel>
    )

}

export default PinPointPanel