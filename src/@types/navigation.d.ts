import { Coupon, RegisterMember, PinPoint, MakeCoupon, MakePinPoint, SearchCampagin } from "@types";

declare module "@types" {
    /* navigation */
    type MainStackParamList = {
        HomeTab: {
            screen?: keyof HomeTabParamList,
        },
        MakeCampaginNav: {
            screen?: keyof MakeCampaginStackParamList,
            params: MakeCampaginStackParamList[keyof MakeCampaginParams]
        },
        ModalNav: {
            screen: keyof ModalStackParamList
            params?: ModalStackParamList[keyof ModalStackParamList]
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
        MakeCampaginStack: MakeCampaginParams,
        MakePinPointStack: MakeCampaginParams,
        MakeCouponStack: {
            pinPointList?: MakePinPoint[],
            coupon?: MakeCoupon,
            editIndex?: number
        },
        FindPinPointLocationStack: MakeCampaginParams
    };
    type MakeCampaginParams = {
        pinpoint?: MakePinPoint,
        coupon?: MakeCoupon,
        editIndex?: number
    }

    type ModalStackParamList = {
        MyCouponStack: undefined,
        GamePlayStack: undefined,
        CampaginDetailStack: CampaginDetailParams
    }
    type CampaginDetailParams = {
        campagin: SearchCampagin
    }
}