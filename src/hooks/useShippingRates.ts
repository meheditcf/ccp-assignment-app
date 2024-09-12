import {useContext} from "react";
import {ShippingRatesContext} from "../context/ShippingRatesContext";

export const useShippingRates = () => {
    const context = useContext(ShippingRatesContext);
    if (context === undefined) {
        throw new Error("useShippingRates must be used within a ShippingRatesProvider");
    }
    return context;
};