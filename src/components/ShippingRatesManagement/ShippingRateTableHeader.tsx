import React from "react";
import {SortingFilter} from "../../types";
import {SORTING_CONFIG} from "../../constants";


interface ShippingRateTableHeaderProps {
    onSort: (key: string) => void;
    sortingFilter: SortingFilter;
}

const ShippingRateTableHeader: React.FC<ShippingRateTableHeaderProps> = ({
                                                                             onSort, sortingFilter
                                                                         }) => {
    const {
        KEYS
    } = SORTING_CONFIG

    const {
        RATE_TYPE,
        PRICE,
        TIMEFRAME,
        FREE_SHIPPING_AMOUNT
    } = KEYS

    const getSortIcon = (key: string) => {
        if (sortingFilter?.key === key) {
            return sortingFilter.order === 'asc' ? '▲' : '▼';
        }
        return '↕';
    };

    return (
        <thead className="bg-blue-100">
        <tr>
            <th className="p-4 text-left cursor-pointer text-sm md:text-base"
                onClick={() => onSort(RATE_TYPE)}
            >Shipping Rate {getSortIcon(RATE_TYPE)}
            </th>
            <th className="p-4 text-left cursor-pointer text-sm md:text-base"
                onClick={() => onSort(PRICE)}>Price {getSortIcon(PRICE)}</th>
            <th className="p-4 text-left cursor-pointer text-sm md:text-base"
                onClick={() => onSort(TIMEFRAME)}>Shipping
                Timeframe {getSortIcon(TIMEFRAME)}</th>
            <th className="p-4 text-left cursor-pointer text-sm md:text-base"
                onClick={() => onSort(FREE_SHIPPING_AMOUNT)}>Free Shipping
                Above {getSortIcon(FREE_SHIPPING_AMOUNT)}
            </th>
            <th className="p-4 text-center text-sm md:text-base">Actions</th>
        </tr>
        </thead>
    );
};

export default ShippingRateTableHeader;
