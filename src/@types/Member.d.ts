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

    type MemberLoginFetchRes = (id: string, pw: string) => { data: BaseDataFetchRes, err: string }
    type MemberLogoutFetchRes = (id: string) => { data: BaseDataFetchRes, err: string }
    type MemberRegisterFetchRes = (data: RegisterMember) => { data: BaseDataFetchRes, err: string }
    type MemberModifyFetchRes = (data: ModifyMember) => { data: BaseDataFetchRes, err: string }
    type MemberWithdrawFetchRes = (id: string, pw: string) => { data: BaseDataFetchRes, err: string }
}