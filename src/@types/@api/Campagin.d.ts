import { Coupon, MakeCoupon, MakePinPoint, PinPoint } from "@types";

declare module "@types" {
    type Campagin = {
        id?: string,
        ownner?: string,
        name: string,
        imgs: string[],
        description: string,
        updateTime?: string,
        region: string

        pinpoints: PinPoint[],
        coupons: Coupon[],
        comments?: [{
            id: string,
            userId: string,
            text: string,
            rated: int,
            imgs: string[]
        }]
    }

    type SearchCampagin = {
        id: string,
        ownner: string,
        name: string,
        imgs: string[],
        description: string,
        updateTime: string,
        region: string

        pinpoints: string[],
        coupons: string[],
        comments: [{
            id: string,
            userId: string,
            text: string,
            rated: int,
            imgs: string[]
        }] | []
    }

    type MakeCampagin = {
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