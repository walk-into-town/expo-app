import React, { useEffect } from 'react'
import { Container, ScrollWrapper } from '../../atoms'
import CampaignView from '../../components/GamePlayStack/CampaignView'
import Game from '../../components/QuizStack/Game'

interface Props {

}

const GamePlayStack = (props: Props) => {

    useEffect(()=>{

        
    },[])
    return (
        // <ScrollWrapper>
        //     <Game />
        // </ScrollWrapper>
        <Container>
            <CampaignView />
        </Container>
    )
}

export default GamePlayStack
