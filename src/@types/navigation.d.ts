import { Coupon, RegisterMember, PinPoint, MakeCoupon, MakePinPoint, SearchCampaign, PinPoint, Coupon, PinPointComment, WriteCampaignComment, WritePinPointComment, MakeCampaign, quizType } from "@types";

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
            params?: GameNavParamList[keyof GameNavParamList]
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
        editIndex?: number,
        campaign?: MakeCampaign
    }

    // 게임
    type GameNavParamList = {
        GamePlayStack: undefined,
        QuizStack: { caid: string, pid: string, quiz: Quiz },
        GameClear: undefined
    }

    // 모달 화면
    type ModalNavParamList = {
        ImageViewer: { images: string[] }

        MyDetailStack: { selectedIndex: number },
        MyCouponStack: undefined,

        CampaignDetailStack: CampaignDetailParams,
        PinPointDetailStack: PinPointDetailParams,
        CouponDetailStack: CouponDetailParams,
    }
    type CampaignDetailParams = {
        campaign: SearchCampaign
    }
    type PinPointDetailParams = {
        cid: string,
        campaignName: string,
        pinpoint: PinPoint
    }
    type CouponDetailParams = {
        campaignName: string,
        coupon: Coupon,
        pinpointList: string[]
    }

    // 편집 모달 화면
    type EditModalNavParamList = {
        MyProfileEditStack: undefined,
        WriteCampaignCommentStack: { caid: string, cname: string, comment: UpdateCampaignComment | null }
        WritePinPointCommentStack: { pid: string, pname: string, comment: WritePinPointComment | null }
    }

    // type GamePlayStackParamList = {
    //     CampaignViewStack: undefined

    // }

    // type GamePlayParams = {
    //     pinpoint?: Pinpoint,
    // }
}