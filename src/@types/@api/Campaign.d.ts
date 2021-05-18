import { Coupon, MakeCoupon, MakePinPoint, PinPoint } from "@types";

declare module "@types" {
    type Campaign = {
        id?: string,
        ownner?: string,
        name: string,
        imgs: string[],
        description: string,
        updateTime?: string,
        region: string

        pinpoints: PinPoint[],
        coupons: Coupon[],
        comments: CampaignComment[]
    }
    type CampaignComment = {
        id: string,
        userId: string,
        nickname: string,
        profileImg: string,
        text: string,
        rated: number,
        imgs: string[],
        updateTime: string
    }
    type MakeCampaignComment = {
        cid: string,
        rated: number,
        text: string,
        imgs: string[],
    }

    // 캠페인 검색
    type SearchCampaign = {
        id: string,
        ownner: string,
        name: string,
        imgs: string[],
        description: string,
        updateTime: string,
        region: string

        pinpoints: string[],
        coupons: string[],
        comments: CampaignComment[]
    }
    type CampaignSearchType = 'name' | 'region' | 'id' | 'ownner';
    type CampaignSearchCondition = 'part' | 'exact';
    type CampaignSearchParams = {
        type: CampaignSearchType,
        condition: CampaignSearchCondition,
        value: string
    }

    // 캠페인 만들기
    type MakeCampaign = {
        id?: string,
        ownner: string,
        name: string,
        imgs: string[],
        description: string,
        region?: string,

        pinpoints: MakePinPoint[],
        coupons: MakeCoupon[],
    }
}