import React from "react";
import {ShippingRate} from "../../types";


interface ShippingRateTableHeaderProps {
    onSort: (column: keyof ShippingRate) => void;
    sortingFilter: SortingFilter;
}

const ShippingRateTableHeader: React.FC<ShippingRateTableHeaderProps> = ({
                                                                             onSort,
                                                                             sortingFilter
                                                                         }) => {
    const getSortIcon = (column: keyof ShippingRate) => {
        if (sortingFilter.column === column) {
            return sortingFilter.order === 'asc' ? '▲' : '▼';
        }
        return '↕';
    };

    return (
        <thead className="bg-blue-100">
        <tr>
            <th className="p-4 text-left cursor-pointer text-sm md:text-base" onClick={() => onSort('rateType')}
            >Shipping Rate {getSortIcon('rateType')}
            </th>
            <th className="p-4 text-left cursor-pointer text-sm md:text-base"
                onClick={() => onSort('price')}>Price {getSortIcon('rateType')}</th>
            <th className="p-4 text-left cursor-pointer text-sm md:text-base">Shipping
                Timeframe {getSortIcon('rateType')}</th>
            <th className="p-4 text-left cursor-pointer text-sm md:text-base"
                onClick={() => onSort('freeShippingAmount')}>Free Shipping
                Above {getSortIcon('rateType')}
            </th>
            <th className="p-4 text-left text-sm md:text-base">Actions</th>
        </tr>
        </thead>
    );
};

export default ShippingRateTableHeader;
