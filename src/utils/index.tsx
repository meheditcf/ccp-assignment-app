import {SHIPPING_RATES} from "../constants";

export const getShippingTypeLabel = (id: number): string | null =>
    Object.values(SHIPPING_RATES).find(rate => rate.value == id)?.label ?? null;
