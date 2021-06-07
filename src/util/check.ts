import { CampaginProfile, Campaign, Coupon, MakeCampaign, MakeCoupon, MakePinPoint, PinPoint, SearchCampaign, } from "@types";

// type check
export const isJsonString = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const isBlank = (v: string[]) => {
    return v.some(s => s.replace(" ", "") === "")
}
export const isUndefined = (v: any[]) => {
    return v.some(e => e === undefined);
}

const isEqualStringArray = (a: string[], b: string[]) => {
    if (a.length !== b.length)
        return false;

    return a.find((item, i) => item !== b[i]) === undefined;
}

// check 
export const isLocalFile = (imgs: string[]) => {
    return imgs.some(v => v.substring(0, 4) === "file");
}

export const isEditPinPoint = (a: MakePinPoint, b: MakePinPoint) => {
    const aq = a.quiz, bq = b.quiz;
    return a.name !== b.name || a.description !== b.description || a.latitude !== b.latitude || a.longitude !== b.longitude
        || aq.answer !== bq.answer || aq.text !== bq.text || aq.type !== bq.type
        || !isEqualStringArray(aq.choices, bq.choices) || !isEqualStringArray(a.imgs, b.imgs);
}
export const isEditCoupon = (a: MakeCoupon, b: MakeCoupon) => {
    return a.name !== b.name || a.description !== b.description
        || a.endDate !== b.endDate || a.limit !== b.limit || a.img !== b.img
}

// convert

export const searchCampaignToMakeCampaign = (campaign: SearchCampaign | CampaginProfile, pinpoints: PinPoint[], coupons: Coupon[]): MakeCampaign => {
    return {
        id: campaign.id,
        name: campaign.name,
        description: campaign.description,
        ownner: campaign.ownner,
        imgs: campaign.imgs,
        region: campaign.region,
        pinpoints: pinpoints.map(p => pinpointToMakePinpoint(p)),
        coupons: coupons.map(c => couponToMakeCoupon(c)),
    }
}

export const pinpointToMakePinpoint = (pinpoint: PinPoint): MakePinPoint => {
    return {
        id: pinpoint.id,
        name: pinpoint.name,
        latitude: pinpoint.latitude,
        longitude: pinpoint.longitude,
        description: pinpoint.description,
        imgs: pinpoint.imgs,
        quiz: pinpoint.quiz
    }
}

export const couponToMakeCoupon = (coupon: Coupon): MakeCoupon => {
    return {
        id: coupon.id,
        name: coupon.name,
        description: coupon.description,
        endDate: coupon.endDate,
        limit: coupon.limit,
        goods: coupon.goods,
        img: coupon.img,
        paymentCondition: 0
    }
}