import {PAGINATION_CONFIG, SHIPPING_RATES, SORTING_CONFIG} from "../constants";
import {ShippingRate, SortingFilter} from "../types";

export const getShippingTypeLabel = (id: number): string | null =>
    Object.values(SHIPPING_RATES).find(rate => rate.value == id)?.label ?? null;


export const sortShippingRates = (
    shippingRates: ShippingRate[],
    sortingFilter: SortingFilter
) => {
    return [...shippingRates].sort((a, b) => {
        const {key, order} = sortingFilter;

        let valueA: number | undefined = 0;
        let valueB: number | undefined = 0;

        if (key === SORTING_CONFIG.KEYS.TIMEFRAME) {
            valueA = (a.timeFrom || 0) + (a.timeTo || 0);
            valueB = (b.timeFrom || 0) + (b.timeTo || 0);
        } else {
            valueA = a[key];
            valueB = b[key];
        }

        const compare = (valueA > valueB ? 1 : -1);
        return order === SORTING_CONFIG.ORDERS.ASCENDING ? compare : -compare;
    });
};


export const paginateShippingRates = (
    shippingRates: ShippingRate[],
    currentPage: number,
) => {
    const {
        PAGE_SIZE
    } = PAGINATION_CONFIG;
    const indexOfLastRate = currentPage * PAGE_SIZE;
    const indexOfFirstRate = indexOfLastRate - PAGE_SIZE;
    return shippingRates.slice(indexOfFirstRate, indexOfLastRate);
};

export const handleDragAndDrop = (
    draggedItemIndex: number | null,
    targetIndex: number,
    shippingRates: ShippingRate[],
    handleReorder: (updatedRates: ShippingRate[]) => void
) => {
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) return;

    const updatedRates = [...shippingRates];
    const draggedItem = updatedRates[draggedItemIndex];

    updatedRates.splice(draggedItemIndex, 1);
    updatedRates.splice(targetIndex, 0, draggedItem);

    handleReorder(updatedRates);
};