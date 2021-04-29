import { Coupon, RegisterMember, PinPoint } from "@types";

declare module "@types" {
    /* navigation */
    type MainStackParamList = {
        HomeTab: {
            screen?: keyof CampaginStackParamList,
        },
        MakeCampaginStack: {
            screen?: keyof MakeCampaginStackParamList,
            params: CampaginParams
        },
        GameStack: undefined,
        ModalStack: {
            screen: keyof ModalStackParamList
        }
    };

    type HomeTabParamList = {
        MyPageStack: undefined,
        CampaignStack: undefined,
        GamePlay: undefined,
        Ranking: undefined,
    };
    type MyPageStackParamList = {
        MyPage: undefined,
        MyCoupon: undefined,
    };
    type CampaginStackParamList = {
        CampaginStack: undefined,
    };

    type MakeCampaginStackParamList = {
        MakeCampagin: CampaginParams,
        MakePinPoint: CampaginParams,
        MakeCoupon: CampaginParams,
    };
    type CampaginParams = {
        pinpoint?: PinPoint,
        coupon?: Coupon,
        editIndex?: number
    }

    type ModalStackParamList = {
        MyCoupon: undefined,
    };
}