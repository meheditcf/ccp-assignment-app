import React from "react";
import ShippingRateForm from "./ShippingRateForm";
import ShippingRateTable from "./ShippingRateTable";
import {ToastContainer} from "react-toastify";
import Loader from "../Loader";
import 'react-toastify/dist/ReactToastify.css';
import {useShippingRates} from "../../hooks/useShippingRates";

const ShippingRatesManagement: React.FC = () => {
    const {
        loading,
    } = useShippingRates();

    return (
        <div className="p-6 rounded-lg max-w-4xl mx-auto flex flex-col gap-y-8">
            <div className="text-center flex flex-col gap-y-1">
                <div className="text-2xl font-bold text-indigo-900">
                    Shipping Rate Management
                </div>
                <p className="text-black max-w-md mx-auto">
                    Manage and configure shipping rates effortlessly. Add, edit, and organize rates with ease for
                    streamlined operations.
                </p>
            </div>
            <ShippingRateForm/>
            {loading ? <Loader/> : <ShippingRateTable/>}
            <ToastContainer/>
        </div>
    );
};

export default ShippingRatesManagement;
