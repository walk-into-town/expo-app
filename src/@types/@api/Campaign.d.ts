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
        rated: int,
        imgs: string[],
        updateTime: string
    }

    type SearchProps = {
        type: 'name' | 'region' | 'id' | 'ownner',
        condition: 'exact' | 'part',
        value: string
    }
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