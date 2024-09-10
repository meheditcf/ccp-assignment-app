import React from "react";

const ShippingRateTableHeader: React.FC = () => {
    return (
        <thead className="bg-gray-100">
        <tr>
            <th className="p-4 text-left">Shipping Rate</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Shipping Timeframe</th>
            <th className="p-4 text-left">Free Shipping Above</th>
            <th className="p-4 text-left">Actions</th>
        </tr>
        </thead>
    );
};

export default ShippingRateTableHeader;
