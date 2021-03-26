declare module "@types" {

    type PinPoint = {
        id: string,
        name: string,
        imgs: [string],
        latitude: float,
        longitude: float,
        updateTime: dateTime,

        quiz: {
            text: string,
            type: int,
            choices: [string],
            answer: string,
        },
        comments: [{
            id: string,
            userId: string,
            text: string,
            imgs: [string]
        }]
    }
}