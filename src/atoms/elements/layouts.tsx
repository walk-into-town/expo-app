import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
`
export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`
export const RowButtonBoxWrapper = styled.View`
    height: 70px;
    flex-direction: row;
`
export const ButtonBox = styled.Text`
    flex: 1;
    text-align: center;
`

export const BtsWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const ScrollWrapper = styled.ScrollView`
    margin: 0 10px;
`

export const Box = styled.View`
    margin: 10px 0;
`
export const PaddingBox = styled.View`
    padding: 10px 20px;
`

export const Googleplace = styled.View`
    flex: 0.61;
    padding: 10px;
`

export const WhiteView = styled.View`
    background-color: white;
`

export const Bubble = styled.View`
    flex-direction: column;
    align-self: flex-start;
    background-color: #ffffff;
    border-radius: 6px;
    border-color: #cccccc;
    border-width: 0.5px;
    padding: 10px;
    width: 200px;
`
