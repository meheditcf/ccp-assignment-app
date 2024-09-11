export interface ShippingRate {
    id: number;
    rateType: number;
    price: number;
    timeFrom: number;
    timeTo: number;
    freeShippingOrderValue?: number;
}


export interface ShippingRateFormValues {
    rateType: number;
    price: number;
    timeFrom: number;
    timeTo: number;
    freeShippingAmount: number;
}
