export interface ShippingRate {
    id: number;
    rateType: number;
    price: number;
    timeFrom: number;
    timeTo: number;
    freeShippingAmount?: number;
}

export interface SortingFilter {
    key: string;
    order: string;
}
