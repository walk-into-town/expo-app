
declare module "@types" {
    type MakeReport = {
        type: "Campaign" | "Pinpoint"
        typeId: string,
        targetId: string,
        description: string,
        targetUser: string,
    }

    type Report = {
        id: string
        type: "Campaign" | "Pinpoint"
        targetId: string,
        targetUser: string,
        userId: string
        description: string,
        processed: boolean,
        date: string
    }
}