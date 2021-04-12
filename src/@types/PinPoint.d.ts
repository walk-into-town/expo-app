declare module "@types" {

    type PinPoint = {
        id?: string,
        name: string,
        imgs: string[],
        latitude: number,
        longitude: number,
        updateTime?: string,

        quiz: {
            text: string,
            type: int,
            choices: string[],
            answer: string,
        },
        comments?: [{
            id: string,
            userId: string,
            text: string,
            imgs: string[]
        }]
    }
}