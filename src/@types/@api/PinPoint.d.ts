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

        quiz: {
            text: string,
            type: quizType,
            choices: string[],
            answer: string,
        },
        comments?: PinPointComment[],
        coupons?: string[]
    }
    type PinPointComment = {
        id: string,
        userId: string,
        text: string,
        rated: string,
        imgs: string[],
        updateTime: string
    }

    type MakePinPoint = {
        id?: string,
        name: string,
        imgs: string[],
        latitude: number,
        longitude: number,
        description: string

        quiz: {
            text: string,
            type: quizType,
            choices: string[],
            answer: string,
        },
    }
}