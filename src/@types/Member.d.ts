import { Coupon, PinPoint } from "@types";

declare module "@types" {
    type Member = {
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
        profileImg: string
    }
}