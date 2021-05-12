import { Coupon, RegisterMember, PinPoint, MakeCoupon, MakePinPoint, SearchCampaign } from "@types";

declare module "@types" {
    /* navigation */
    type MainStackParamList = {
        HomeTab: {
            screen?: keyof HomeTabParamList,
        },
        MakeCampaignNav: {
            screen?: keyof MakeCampaignStackParamList,
            params: MakeCampaignStackParamList[keyof MakeCampaignParams]
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

    type MakeCampaignStackParamList = {
        MakeCampaignStack: MakeCampaignParams,
        MakePinPointStack: MakeCampaignParams,
        MakeCouponStack: {
            pinPointList?: MakePinPoint[],
            coupon?: MakeCoupon,
            editIndex?: number
        },
        FindPinPointLocationStack: MakeCampaignParams
    };
    type MakeCampaignParams = {
        pinpoint?: MakePinPoint,
        coupon?: MakeCoupon,
        editIndex?: number
    }

    type ModalStackParamList = {
        MyCouponStack: undefined,
        GamePlayStack: undefined,
        CampaignDetailStack: CampaignDetailParams
    }
    type CampaignDetailParams = {
        campagin: SearchCampaign
    }
}