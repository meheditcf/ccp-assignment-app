export const SHIPPING_RATES = {
    STANDARD: {
        value: 'standard',
        label: 'Standard',
    },
    EXPRESS: {
        value: 'express',
        label: 'Express',
    }
};


export const INITIAL_FORM_VALUES = {
    id: 0,
    rateType: SHIPPING_RATES.STANDARD.value,
    price: 0,
    timeFrom: 0,
    timeTo: 1,
    freeShippingAmount: 0,
};