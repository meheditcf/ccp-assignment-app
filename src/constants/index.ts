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

export const SORTING_CONFIG = {
    KEYS: {
        RATE_TYPE: 'rateType' as const,
        PRICE: 'price' as const,
        TIMEFRAME: 'timeframe' as const,
        FREE_SHIPPING_AMOUNT: 'freeShippingAmount' as const,
    },
    ORDERS: {
        ASCENDING: 'asc' as const,
        DESCENDING: 'desc' as const,
    }
};

export const PAGINATION_CONFIG = {
    PAGE_SIZE: 5 as const,
    PAGE_NUMBER: 1 as const,
};


