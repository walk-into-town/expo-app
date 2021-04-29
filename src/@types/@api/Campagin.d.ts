import { Coupon, PinPoint } from "@types";

declare module "@types" {
    type Campagin = {
        id?: string,
        ownner?: string,
        name: string,
        imgs: string[],
        description: string,
        updateTime?: dateTime,
        region: string

        pinpoints: PinPoint[],
        coupons: Coupon[],
        comments?: [{
            id: string,
            userId: string,
            text: string,
            rated: int,
            imgs: [string]
        }]
    }
}