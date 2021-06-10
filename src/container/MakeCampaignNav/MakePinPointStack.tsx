import React, { useEffect, useState } from 'react'
import { quizType, MakeCampaignNavParamList, MakePinPoint } from '@types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { isBlank, isEditPinPoint, isLocalFile } from '../../util'
import { useSubmit, perventGoBack, makeCampaignNavigation } from '../../useHook'

import { SubmitButton, ScrollWrapper, DefaultAlert } from '../../atoms'
import MakePinPointView from '../../components/MakePinPointStack/MakePinPointView'
import MakeQuiz from '../../components/MakePinPointStack/MakeQuiz'

const MakePinPointStack = () => {
    const campaginNav = makeCampaignNavigation();
    const nav = useNavigation();

    const { params: { pinpoint, editIndex } } = useRoute<RouteProp<MakeCampaignNavParamList, 'MakePinPointStack'>>();
    const [name, setName] = useState(pinpoint?.name || "");
    const [latitude, setLatitude] = useState<number>(pinpoint?.latitude || 0);
    const [longitude, setLongitude] = useState<number>(pinpoint?.longitude || 0);
    const [description, setDescription] = useState(pinpoint?.description || "");
    const [pinPointImgs, setPinPointImgs] = useState<string[]>(pinpoint?.imgs || []);

    const [quizText, setQuizText] = useState<string>(pinpoint?.quiz.text || "");
    const [type, setType] = useState<quizType>(pinpoint?.quiz.type || "주관식");
    const [choices, setChoices] = useState<string[]>(pinpoint?.quiz.choices || [""]);
    const [answer, setAnswer] = useState<string>(pinpoint?.quiz.answer || "");
    const [selectedAnswer, setSelectedAnswer] = useState(pinpoint?.quiz.answer || "");

    useEffect(() => {
        if (editIndex !== undefined)
            nav.setOptions({ headerTitle: "핀포인트 수정하기" })
        if (pinpoint) {
            setLatitude(pinpoint.latitude)
            setLongitude(pinpoint.longitude)
        }
    }, [pinpoint])

    // 핀포인트 업로드
    const getPinpoint: () => MakePinPoint = () => {
        const selectAns = selectedAnswer === "" ? choices[0] : selectedAnswer;
        return {
            id: pinpoint?.id,
            name,
            imgs: pinPointImgs,
            latitude,
            longitude,
            description,

            quiz: {
                text: quizText,
                type: type,
                choices,
                answer: type === '주관식' ? answer : selectAns,
            }
        }
    }

    const onSubmit = () => {
        if (latitude + longitude === 0)
            return DefaultAlert({ title: "위치 설정 오류", subTitle: "해당 핀포인트로 모험을 떠날 수 있게 위치를 설정해주세요!" })

        if (isBlank([name, description, quizText]))
            return DefaultAlert({ title: "필수 입력을 확인해주세요", subTitle: "" })

        if (isBlank(type === "주관식" ? [answer] : choices))
            return DefaultAlert({ title: "퀴즈 오류", subTitle: "퀴즈에 비어 있는 값이 있으면 안됩니다." })

        if (isLocalFile(pinPointImgs))
            return DefaultAlert({ title: "사진을 서버로 먼저 전송해주세요!" })

        const pinpoint: MakePinPoint = getPinpoint();
        campaginNav.navigate('MakeCampaignStack', { pinpoint, editIndex });
    }
    // const { isSubmit, onSubmit } = useSubmit({
    //     submitFunc: async () => {
    //         if (latitude + longitude === 0)
    //             return DefaultAlert({ title: "위치 설정 오류", subTitle: "해당 핀포인트로 모험을 떠날 수 있게 위치를 설정해주세요!" })

    //         if (isBlank([name, description, quizText]))
    //             return DefaultAlert({ title: "필수 입력을 확인해주세요", subTitle: "" })

    //         if (isBlank(type === "주관식" ? [answer] : choices))
    //             return DefaultAlert({ title: "퀴즈 오류", subTitle: "퀴즈에 비어 있는 값이 있으면 안됩니다." })

    //         if (isLocalFile(pinPointImgs))
    //             return DefaultAlert({ title: "사진을 서버로 먼저 전송해주세요!" })

    //         const pinpoint: MakePinPoint = getPinpoint();
    //         campaginNav.navigate('MakeCampaignStack', { pinpoint, editIndex });
    //     }
    // });
    // const hasUnsavedChanges = Boolean((pinpoint ? isEditPinPoint(pinpoint, getPinpoint())
    //     : name || pinPointImgs.length || description || quizText || answer)) && !isSubmit;
    // perventGoBack({ hasUnsavedChanges })

    // FindPinPoint
    const navToFindPinPointLocationModal = () => {
        const pinpoint: MakePinPoint = getPinpoint();
        campaginNav.navigate("FindPinPointLocationStack", { pinpoint, editIndex })
    }

    return (
        <ScrollWrapper>
            <MakePinPointView
                useName={[name, setName]}
                useLatitude={[latitude, setLatitude]}
                useLongitude={[longitude, setLongitude]}
                usePinPointImgs={[pinPointImgs, setPinPointImgs]}
                useDescription={[description, setDescription]}
                navToFindPinPointLocationModal={navToFindPinPointLocationModal}
            />

            <MakeQuiz
                useQuizText={[quizText, setQuizText]}
                useType={[type, setType]}
                useChoices={[choices, setChoices]}
                useAnswer={[answer, setAnswer]}
                useSelectedAnswer={[selectedAnswer, setSelectedAnswer]}
            />

            <SubmitButton title="핀포인트 완료" onPress={onSubmit} />
        </ScrollWrapper>
    )
}

export default MakePinPointStack;
