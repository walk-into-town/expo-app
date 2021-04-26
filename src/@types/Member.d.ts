declare module "@types" {
    type RegisterMember = {
        id: string,
        pw: string,
        nickname: string,
        // isManager: boolean
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
    type MemberLogoutFetchRes = (id: string) => { data: BaseDataFetchRes, err: string }
    type MemberRegisterFetchRes = (data: RegisterMember) => { data: BaseDataFetchRes, err: string }
    type MemberModifyFetchRes = (data: ModifyMember) => { data: BaseDataFetchRes, err: string }
    type MemberWithdrawFetchRes = (id: string, pw: string) => { data: BaseDataFetchRes, err: string }
}