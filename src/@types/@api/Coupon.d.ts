declare module "@types" {
    type Coupon = {
        id?: string,
        name: string,
        description: string,
        goods: string,
        endDate: string,
        issued?: int,
        limit: int,
        img: string,
    }
    
    type MakeCoupon = {
        id?: string,
        name: string,
        description: string,
        goods: string,
        endDate: string,
        limit: int,
        img: string,
        paymentCondition: number
    }
}