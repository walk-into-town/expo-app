import { Coupon, MakePinPoint } from "@types";

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
export const isEditPinPoint = (a: MakePinPoint, b: MakePinPoint) => {
  const aq = a.quiz, bq = b.quiz;
  return a.name !== b.name || a.description !== b.description || a.latitude !== b.latitude || a.longitude !== b.longitude
    || aq.answer !== bq.answer || aq.text !== bq.text || aq.type !== bq.type
    || !isEqualStringArray(aq.choices, bq.choices) || !isEqualStringArray(a.imgs, b.imgs);
}
export const isEditCoupon = (a: Coupon, b: Coupon) => {
  return a.name !== b.name || a.description !== b.description
    || a.endDate !== b.endDate || a.limit !== b.limit || a.img !== b.img
}

// time
export const getDateAfter = (dayAfter: number) => {
  const now = new Date();
  return new Date(now.setDate(now.getDate() + dayAfter));
}

export const toCommonDate = (time: string) => {
  return time.slice(0, 10).replaceAll('-', '.');
}

export const toCommonDateTime = (time: string) => {
  return `${toCommonDate(time)} ${time.slice(11, 19)}`
}