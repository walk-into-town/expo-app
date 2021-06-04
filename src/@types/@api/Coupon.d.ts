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
    type MyCoupon = {
        id?: string,
        name: string,
        description: string,
        goods: string,
        endDate: string,
        img: string,
        paymentCondition: number,
        used: boolean
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

    type ResCoupon = {
        name: string,
        goods: string,
        imgs: string
    }
}