import React, { useEffect, useState } from 'react'
import { PinPoint, quizType, MakeCampaginStackParamList } from '@types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { makeCampaginNavigation } from '../../navigation/useNavigation'
import { isBlank, isEditPinPoint } from '../../util'
import { useSubmit, perventGoBack } from '../../useHook'

import { SubmitButton, ScrollWrapper } from '../../atoms'
import MakePinPoint from '../../components/MakePinPointStack/MakePinPoint'
import MakeQuiz from '../../components/MakePinPointStack/MakeQuiz'
import DefaultAlert from '../../atoms/DefaultAlert'

const MakePinPointStack = () => {
    const campaginNav = makeCampaginNavigation();
    const nav = useNavigation();

    const { params: { pinpoint, editIndex } } = useRoute<RouteProp<MakeCampaginStackParamList, 'MakePinPointStack'>>();

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [pinPointImgs, setPinPointImgs] = useState<string[]>([]);

    const [quizText, setQuizText] = useState<string>("");
    const [type, setType] = useState<quizType>("주관식");
    const [choices, setChoices] = useState<string[]>([""]);
    const [answer, setAnswer] = useState<string>("");
    const [selectedAnswer, setSelectedAnswer] = useState("");

    useEffect(() => {
        if (pinpoint === undefined) return;

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "핀포인트 수정하기" })

        setName(pinpoint.name);
        setLatitude(pinpoint.latitude);
        setLongitude(pinpoint.longitude);
        setDescription(pinpoint.description);

        setQuizText(pinpoint.quiz.text);
        setType(pinpoint.quiz.type);
        setChoices(pinpoint.quiz.choices);
        if (pinpoint.quiz.type === '주관식')
            setAnswer(pinpoint.quiz.answer);
        else
            setSelectedAnswer(pinpoint.quiz.answer);

    }, [pinpoint])

    // 핀포인트 업로드
    const getPinpoint: () => PinPoint = () => {
        return {
            name,
            imgs: pinPointImgs,
            latitude,
            longitude,
            description,

            quiz: {
                text: quizText,
                type: type,
                choices,
                answer: type === '주관식' ? answer : selectedAnswer,
            }
        }
    }
    const { isSubmit, onSubmit } = useSubmit({
        submitFunc: () => {
            if (latitude + longitude === 0) {
                DefaultAlert({ title: "위치 설정 오류", subTitle: "해당 핀포인트로 모험을 떠날 수 있게 위치를 설정해주세요!" })
                return;
            }
            if (isBlank([name, description, quizText])) {
                DefaultAlert({ title: "필수 입력을 확인해주세요", subTitle: "" })
                return;
            }
            if (isBlank(type === "주관식" ? [answer] : choices)){
                DefaultAlert({ title: "퀴즈 오류", subTitle: "퀴즈에 비어 있는 값이 있으면 안됩니다."})
                return;
            }


            const pinpoint: PinPoint = getPinpoint();
            campaginNav.navigate('MakeCampaginStack', { pinpoint, editIndex });
        }
    });
    const hasUnsavedChanges = Boolean((pinpoint ? isEditPinPoint(pinpoint, getPinpoint())
        : name || pinPointImgs.length || description || quizText || answer)) && !isSubmit;
    perventGoBack({ hasUnsavedChanges })

    // FindPinPoint
    const navToFindPinPointLocationModal = () => {
        const pinpoint: PinPoint = getPinpoint();
        campaginNav.navigate("FindPinPointLocationStack", { pinpoint, editIndex })
    }

    return (
        <ScrollWrapper>
            <MakePinPoint
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
