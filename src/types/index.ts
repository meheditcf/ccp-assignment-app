export interface ShippingRate {
    id: number;
    rateType: string;
    price: number;
    timeFrom: number;
    timeTo: number;
    freeShippingOrderValue?: number;
}


export interface ShippingRateFormValues {
    rateType: string;
    price: number;
    timeFrom: number;
    timeTo: number;
    freeShippingAmount: number;
}
