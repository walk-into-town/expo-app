import React from 'react'
import { View, Text } from 'react-native'
import { ScrollWrapper } from '../../atoms'
import Game from '../../components/GameStack/Game'

interface Props {

}

const GamePlayStack = (props: Props) => {
    return (
        <ScrollWrapper>
            <Game />
        </ScrollWrapper>
    )
}

export default GamePlayStack
