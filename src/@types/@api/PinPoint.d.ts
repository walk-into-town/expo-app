declare module "@types" {
    type quizType = "객관식" | "주관식";

    type PinPoint = {
        id: string,
        name: string,
        imgs: string[],
        latitude: number,
        longitude: number,
        updateTime: string,
        description: string

        quiz: Quiz,
        comments: PinPointComment[],
        coupons: string[]
    }
    type PinPointComment = {
        id: string,
        userId: string,
        nickname: string,
        profileImg: string,
        text: string,
        rated: number,
        imgs: string[],
        updateTime: string
    }
    type WritePinPointComment = {
        coid: string,
        text: string,
        imgs: string[]
    }

    type MakePinPoint = {
        id?: string,
        name: string,
        imgs: string[],
        latitude: number,
        longitude: number,
        description: string

        quiz: Quiz
    }
    type Quiz = {
        text: string,
        type: quizType,
        choices: string[],
        answer: string,
    }
}