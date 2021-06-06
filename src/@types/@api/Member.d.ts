import { BaseDataFetchRes, BaseDataFetchRes } from "@types"

declare module "@types" {
    type RegisterMember = {
        id: string,
        pw: string,
        nickname: string,
        isManager: boolean
    }

    type ModifyMember = {
        uid: string,
        // pw: string,
        // cpw: string,      /*new password*/
        nickname: string,
        img: string,
        selfIntroduction: string
    }

    type MemberLoginRes = {
        nickname: string,
        profileImg: string,
        selfIntroduction: string,
    }

    type MemberInfoRes = {
        playingCampaign: number,
        myCampaign: number,
        clearCampaign: number,
        badge: string[]
    }


    type PartedMember = {
        nickname: string,
        profileImg: string,
        cleared: boolean,
        pinpoints: string[],
        clearedPinpoints: string[]
    }

    type RankMember = {
        rank?: number,
        cleared: number,
        userId: string,
        nickname: string,
        profileImg: string
    }

    type MemberCoordinate = {
        latitude: number,
        longitude: number
    }

}