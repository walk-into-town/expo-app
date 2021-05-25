import React from 'react'
import { Container, ScrollWrapper } from '../../atoms'
import Game from '../../components/QuizStack/Game'

interface Props {

}

const QuizStack = (props: Props) => {
    return (
        <ScrollWrapper>
            <Game />
        </ScrollWrapper>
    )
}

export default QuizStack