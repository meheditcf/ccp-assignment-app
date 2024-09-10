import React from "react";
import {ShippingRate} from "../types";
import Button from "./Button";

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

    return (
        <tr
            draggable
            className="hover:bg-gray-50"
            onDragStart={() => onDragStart(index)}
            onDrop={() => onDrop(index)}
            onDragOver={(e) => e.preventDefault()}
        >
            <td className="p-4">{rateType}</td>
            <td className="p-4">${price}</td>
            <td className="p-4">
                {timeFrom} - {timeTo} days
            </td>
            <td className="p-4">
                {freeShippingAmount ? `$${freeShippingAmount}` : "N/A"}
            </td>
            <td className="p-4">
                <div className="flex gap-x-4">
                    <Button
                        type="button"
                        label="Edit"
                        variant="secondary"
                        onClick={() => onEdit(rate)}
                    />
                    <Button
                        type="button"
                        label="Delete"
                        variant="danger"
                        onClick={() => onDelete(id)}
                    />
                </div>
            </td>
        </tr>
    );
};

export default ShippingRateRow;
