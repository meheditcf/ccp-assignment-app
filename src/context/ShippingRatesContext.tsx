import React, {createContext, useState} from "react";
import {toast} from "react-toastify";
import {ShippingRate} from "../types";


interface ShippingRatesContextProps {
    shippingRates: ShippingRate[];
    currentRate: ShippingRate | null;
    loading: boolean;
    setCurrentRate: (rate: ShippingRate | null) => void;
    handleAdd: (rate: ShippingRate) => void;
    handleEdit: (rate: ShippingRate) => void;
    handleDelete: (id: number) => void;
    handleReorder: (newRates: ShippingRate[]) => void;
}

// Creating context
export const ShippingRatesContext = createContext<ShippingRatesContextProps | undefined>(undefined);

// Provider component
export const ShippingRatesProvider: React.FC = ({children}) => {
    const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
    const [currentRate, setCurrentRate] = useState<ShippingRate | null>(null);
    const [loading, setLoading] = useState(false);

    // Here, added loader and timeout to make it more realistic like an API call
    const updateRates = (newRates: ShippingRate[], successMsg: string = '') => {
        setLoading(true);
        setTimeout(() => {
            try {
                setShippingRates(newRates);
                setLoading(false);
                if (successMsg) {
                    toast.success(successMsg);
                }
            } catch (error) {
                setLoading(false);
                toast.error('Failed to do the operation. Please try again later.');
            }
        }, 500);
    };

    const handleAdd = (rate: ShippingRate) => {
        updateRates([...shippingRates, {...rate, id: Date.now()}], "Shipping rate added successfully");
        setCurrentRate(null);
    };

    const handleEdit = (rate: ShippingRate) => {
        updateRates([...shippingRates.filter((r) => r.id !== rate.id), rate], "Shipping rate updated successfully");
        setCurrentRate(null);
    };

    const handleDelete = (id: number) => {
        updateRates(shippingRates.filter((rate) => rate.id !== id), "Shipping rate deleted successfully");
    };

    const handleReorder = (newRates: ShippingRate[]) => {
        setShippingRates(newRates);
    };

    return (
        <ShippingRatesContext.Provider
            value={{
                shippingRates,
                currentRate,
                loading,
                setCurrentRate,
                handleAdd,
                handleEdit,
                handleDelete,
                handleReorder,
            }}
        >
            {children}
        </ShippingRatesContext.Provider>
    );
};
