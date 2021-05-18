import { Coupon, RegisterMember, PinPoint, MakeCoupon, MakePinPoint, SearchCampaign, PinPoint, Coupon } from "@types";

declare module "@types" {
    /* navigation */
    type MainStackParamList = {
        HomeTab: {
            screen?: keyof HomeTabParamList,
        },
        MakeCampaignNav: {
            screen?: keyof MakeCampaignNavParamList,
            params: MakeCampaignNavParamList[keyof MakeCampaignParams]
        },
        GameNav: {
            screen?: keyof GameNavParamList
        },
        ModalNav: {
            screen: keyof ModalNavParamList
            params?: ModalNavParamList[keyof ModalNavParamList]
        },
        EditModalNav: {
            screen: keyof EditModalNavParamList
            params?: EditModalNavParamList[keyof EditModalNavParamList]
        }
    };

    // 홈 화면
    type HomeTabParamList = {
        MyPageStack: undefined,
        CampaignStack: undefined,
        GameStack: undefined,
        RankingStack: undefined,
    };

    // 캠페인 만들기
    type MakeCampaignNavParamList = {
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

    // 게임
    type GameNavParamList = {
        GamePlayStack: undefined,
    }

    // 모달 화면
    type ModalNavParamList = {
        MyDetailStack: { selectedIndex: number },
        MyCouponStack: undefined,

        CampaignDetailStack: CampaignDetailParams,
        PinPointDetailStack: PinPointDetailParams,
        CouponDetailStack: CouponDetailParams
    }
    type CampaignDetailParams = {
        campaign: SearchCampaign
    }
    type PinPointDetailParams = {
        campaignName: string,
        pinpoint: PinPoint
    }
    type CouponDetailParams = {
        campaignName: string,
        coupon: Coupon
    }

    // 편집 모달 화면
    type EditModalNavParamList = {
        MyProfileEditStack: undefined,
        WriteCampaignCommentStack: undefined

    }
}