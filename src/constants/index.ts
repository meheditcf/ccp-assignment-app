export const SHIPPING_RATES = {
    STANDARD: {
        value: 1,
        label: 'Standard',
    },
    EXPRESS: {
        value: 2,
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
