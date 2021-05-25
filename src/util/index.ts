import { Coupon, MakePinPoint, SearchCampaign } from "@types";

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
  return `${toCommonDate(time)} ${time.slice(11, 19)}`;
}

export const getPassingText = (time: string) => {
  const day = (new Date().getTime() - new Date(time).getTime()) / 1000 / 3600 / 24;
  if (day < 1) return "오늘";
  if (day < 2) return "어제";
  if (day < 3) return "그제";
  if (day < 7) return "이번 주";
  if (day < 30) return "이번 달";

  const month = day / 30;
  if (month < 13) return "올 해";

  return toCommonDate(time);
}

export const getPassingTime = (time: string) => {
  const min = (new Date().getTime() - new Date(time).getTime()) / 1000 / 60;
  if (min < 60) return Math.floor(min) + "분";
  const hour = min / 60;
  if (hour < 24) return Math.floor(hour) + "시간";
  const day = hour / 24;
  if (day < 7) return Math.floor(day) + "일";
  if (day < 365) return Math.floor(day / 7) + "주";
  return Math.floor(day / 365) + "년";
}

// campaign rate
export const getRatedAvg = (campaign: SearchCampaign) => {
  if (campaign.comments.length === 0) return 0;

  const totalReted = campaign.comments.reduce((ac, v) => ac + Number(v.rated), 0);
  return totalReted / campaign.comments.length;
}