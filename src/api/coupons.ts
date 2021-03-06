import { BaseFetchRes, Coupon, CouponReadParams, MyCoupon } from "@types";
import { baseFetch } from "./baseFetch";
import { ip } from "./ip";

type CouponReadFetch = (params: CouponReadParams) => BaseFetchRes<Coupon[]>
export const couponRead: CouponReadFetch = (params) => {
    return baseFetch(`${ip}/coupon?type=${params.type}&value=${params.value}`, "GET");
}

export const couponUse = (body: { cid: string }): BaseFetchRes<any> => {
    return baseFetch(`${ip}/coupon/use`, "POST", { body });
}

export const couponMy = (): BaseFetchRes<MyCoupon[]> => {
    return baseFetch(`${ip}/member/coupon`, "GET");
}