declare module "@types" {
    type Coupon = {
        id?: string,
        name: string,
        description: string,
        goods: string,
        endDate: string,
        issued: number,
        limit: number,
        img: string,
        paymentCondition: number
    }

    type MakeCoupon = {
        id?: string,
        name: string,
        description: string,
        goods: string,
        endDate: string,
        limit: number,
        img: string,
        paymentCondition: number
    }
}