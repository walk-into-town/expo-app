import { Coupon, RegisterMember, PinPoint } from "@types";

declare module "@types" {
    /* navigation */
    type MainStackParamList = {
        HomeTab: {
            screen?: keyof HomeTabParamList,
        },
        MakeCampaginNav: {
            screen?: keyof MakeCampaginStackParamList,
            params: CampaginParams
        },
        ModalNav: {
            screen: keyof ModalStackParamList
        }
    };

    type HomeTabParamList = {
        MyPageNav: {
            screen?: keyof MyPageStackParamList
        },
        CampaignStack: undefined,
        GameStack: undefined,
        RankingStack: undefined,
    };
    type MyPageStackParamList = {
        MyPageStack: undefined,
    };

    type MakeCampaginStackParamList = {
        MakeCampaginStack: CampaginParams,
        MakePinPointStack: CampaginParams,
        MakeCouponStack: CampaginParams,
        FindPinPointLocationStack: CampaginParams
    };
    type CampaginParams = {
        pinpoint?: PinPoint,
        coupon?: Coupon,
        editIndex?: number
    }

    type ModalStackParamList = {
        MyCouponStack: undefined,
        GamePlayStack: undefined
    };
}