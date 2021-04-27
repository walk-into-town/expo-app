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
        pw: string,
        cpw: string,      /*new password*/
        nickname: string,
        profileImg: string,
        selfIntroduction: string
    }

    type MemberLoginRes = {
        nickname: string,
        profileImg: string,
        selfIntroduction: string
    }

    type MemberLoginFetchRes = (data: { id: string, pw: string }) => Promise<{
        result: 'success' | 'failed',
        message?: {
            nickname: string
            profileImg: string
            seflIntruduction: string
        }
        error?: string
    }>
    type MemberLogoutFetchRes = (data: { id: string }) => Promise<BaseDataFetchRes>
    type MemberRegisterFetchRes = (data: RegisterMember) => Promise<BaseDataFetchRes>
    type MemberModifyFetchRes = (data: ModifyMember) => { data: BaseDataFetchRes, err: string }
    type MemberWithdrawFetchRes = (data: {id: string, pw: string}) => { data: BaseDataFetchRes, err: string }
}