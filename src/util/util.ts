import { Coupon, PinPoint } from "@types";

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

export const isEditPinPoint = (a: PinPoint, b: PinPoint) => {
    const aq = a.quiz, bq = b.quiz;
    return a.name !== b.name || a.description !== b.description || a.latitude !== b.latitude
        || aq.answer !== bq.answer || aq.text !== bq.answer || aq.type !== bq.type
        || !isEqualStringArray(aq.choices, bq.choices) || !isEqualStringArray(a.imgs, b.imgs);
}
export const isEditCoupon = (a: Coupon, b: Coupon) => {
    return a.name !== b.name || a.description !== b.description
        || a.endDate !== b.endDate || a.limit !== b.limit || !isEqualStringArray(a.imgs, b.imgs)
}