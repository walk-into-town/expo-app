import React, { useState } from 'react'
import { Image, Text, Dimensions, View } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel'
import { PinPoint, TuseState } from '@types'
import { AbsoluteCousel, ClearButton, Row, SubTitle, Title } from '../../atoms';


interface Props {
    usePanelActivie: TuseState<boolean>,
    pinPoint: PinPoint | undefined,
    navtoPinPointDetail: (pinpoint: PinPoint) => void
    navtoGame: (pinpoint: PinPoint) => void
}

const PinPointPanel = ({ usePanelActivie, pinPoint, navtoPinPointDetail, navtoGame }: Props) => {
    // const [pinPoint, setPinPoint] = pinPoint
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        onlySmall: true,
        closeOnTouchOutside: true
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

                        <Image
                            source={{ uri: pinPoint.imgs[0]  }}
                            style={{
                                width: pageWidth,
                                height: "150%",
                                position:'absolute',
                                resizeMode: 'stretch'
                            }} />

                        <Title style={{ alignSelf: 'flex-start', color: pinPoint.imgs[0]? 'white' : 'black',  marginTop: 20, fontSize: 30}}>{pinPoint.name}</Title>
                        <SubTitle style={{ alignSelf: 'flex-start', color: pinPoint.imgs[0]? 'white' : 'black', marginTop: 5, fontSize: 15 }} numberOfLines={1}>{pinPoint.description}</SubTitle>
                        <Row style={{ alignSelf: 'center', marginTop: 50}}>
                        <ClearButton color='#00c3ff' title="핀포인트 상세" onPress={()=>navtoPinPointDetail(pinPoint)}/>
                        <ClearButton color='#00c3ff' title="퀴즈 GOGO" onPress={()=>navtoGame(pinPoint)}/>
                        </Row>
                        
                        
                    </View>

            }





        </SwipeablePanel>
    )

}

export default PinPointPanel