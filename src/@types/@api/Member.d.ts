import { BaseDataFetchRes, BaseDataFetchRes } from "@types"

declare module "@types" {
    type RegisterMember = {
        id: string,
        pw: string,
        nickname: string,
        isManager: boolean
    }

    type ModifyMember = {
        id: string,
        // pw: string,
        // cpw: string,      /*new password*/
        nickname: string,
        profileImg: FormData,
        selfIntroduction: string
    }

    type MemberLoginRes = {
        nickname: string,
        profileImg: string,
        selfIntroduction: string
    }
    
    type MemberInfoRes = {
        playingCampaign: number,
        myCampaign: number,
        clearCampaign: number
    }
}