declare module "@types" {
    type Coupon = {
        id?: string,
        name: string,
        description: string,
        goods: string,
        endDate: string,
        issued?: int,
        limit: int,
        imgs: string,
    }
    
    type MakeCoupon = {
        id?: string,
        name: string,
        description: string,
        goods: string,
        endDate: string,
        limit: int,
        imgs: string,
        paymentCondition: number
    }
}