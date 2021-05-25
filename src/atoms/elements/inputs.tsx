import React from 'react';
import { LightSearchBarProps, TuseState } from "@types"
import { TextInputProps, View } from "react-native"
import { Input, SearchBar, Text } from "react-native-elements"
import { RateStarIcon } from './icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text3 } from './texts';
import { colorCode } from '../color';

export const WhiteInput = (option: TextInputProps) => (
    <Input
        placeholder="입력해주세요."
        selectionColor={"#FFF"}
        inputStyle={{ color: "#FFF", fontSize: 25, fontFamily: "SCDream5" }}
        autoCapitalize="none"
        {...option}
    />
)
export const WhiteInputArea = (option: TextInputProps) => (
    <Input
        placeholder="입력해주세요."
        selectionColor={"#FFF"}
        style={{ height: 100 }}
        inputStyle={{ color: "#FFF", fontSize: 17, fontFamily: "SCDream5" }}
        autoCapitalize="none"
        multiline
        numberOfLines={4}
        {...option}
    />
)

export const TextArea = (option: TextInputProps) => (
    <Input
        multiline
        numberOfLines={4}
        style={{ height: 100 }}
        autoCapitalize="none"
        {...option}
    />
)

export const LightSearchBar = (option: LightSearchBarProps) => {
    option = {
        ...option,
        placeholder: "검색어",
        cancelButtonTitle: "취소",
    }
    return (
        <SearchBar
            platform="ios"
            containerStyle={{ backgroundColor: "transparent" }}
            autoCapitalize="none"
            {...option}
        />
    )
}

interface RateStarProps {
    useRated: TuseState<number>
}
export const RatedStar = (props: RateStarProps): JSX.Element => {
    const [rated, setRated] = props.useRated;
    const stateText = ["별로예요", "조금 아쉬워요", "보통이에요", "좋아요", "최고예요"];

    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                {
                    [...Array(5)].map((_, idx) => (
                        <TouchableOpacity onPress={() => setRated(idx + 1)} key={idx} style={{ marginHorizontal: 5 }}>
                            <RateStarIcon toggle={idx < rated} size={35} />
                        </TouchableOpacity>
                    ))
                }
            </View>
            <Text style={{ fontFamily: "SCDream5", textAlign: 'center', marginTop: 10 }}>
                {rated} <Text style={{ color: colorCode.gray }}>/ 5 ・</Text> {stateText[rated - 1]}
            </Text>
        </View>
    )
}