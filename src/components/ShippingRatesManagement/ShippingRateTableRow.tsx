import React from "react";
import {ShippingRate} from "../../types";
import {getShippingTypeLabel} from "../../utils";
import Button from "../Button";


interface ShippingRateRowProps {
    rate: ShippingRate;
    index: number;
    onEdit: (rate: ShippingRate) => void;
    onDelete: (id: string) => void;
    onDragStart: (index: number) => void;
    onDrop: (index: number) => void;
}

const ShippingRateRow: React.FC<ShippingRateRowProps> = ({rate, index, onEdit, onDelete, onDragStart, onDrop}) => {
    const {
        rateType,
        price,
        timeFrom,
        timeTo,
        freeShippingAmount,
        id
    } = rate || {};

    const typeLabel = getShippingTypeLabel(rateType);

    return (
        <tr
            draggable
            className="hover:bg-gray-100"
            onDragStart={() => onDragStart(index)}
            onDrop={() => onDrop(index)}
            onDragOver={(e) => e.preventDefault()}
        >
            <td className="p-4 text-left text-sm md:text-base">{typeLabel}</td>
            <td className="p-4 text-center text-sm md:text-base">${price}</td>
            <td className="p-4 text-center text-sm md:text-base">
                {timeFrom} - {timeTo} days
            </td>
            <td className="p-4 text-center text-sm md:text-base">
                {freeShippingAmount ? `$${freeShippingAmount}` : "N/A"}
            </td>
            <td className="p-4 text-sm md:text-base">
                <div className="flex gap-x-4">
                    <Button
                        type="button"
                        label="Edit"
                        variant="secondary"
                        onClick={() => onEdit(rate)}
                        size="sm"
                        helpText="Edit"
                    />
                    <Button
                        type="button"
                        label="Delete"
                        variant="danger"
                        onClick={() => onDelete(id)}
                        size="sm"
                        helpText="Delete"
                    />
                </div>
            </td>
        </tr>
    );
};

export default ShippingRateRow;
