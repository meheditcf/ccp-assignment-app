import React, {useState} from "react";
import ShippingRateForm from "./ShippingRateForm";
import ShippingRateTable from "./ShippingRateTable";
import {toast, ToastContainer} from "react-toastify";
import Loader from "../Loader";
import 'react-toastify/dist/ReactToastify.css';
import {ShippingRate} from "../../types";

const ShippingRatesManagement: React.FC = () => {
    const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
    const [currentRate, setCurrentRate] = useState<ShippingRate | null>(null);
    const [loading, setLoading] = useState(false);

    // Here, added loader and timeout to make it more realistic like an API call
    const updateShippingRates = (newRates: ShippingRate[]) => {
        setLoading(true);
        setTimeout(() => {
            setShippingRates(newRates);
            setLoading(false);
        }, 500); // Assume the API takes half second
    };


    const handleAddRate = (rate: ShippingRate) => {
        updateShippingRates([...shippingRates, {...rate, id: Date.now()}]);
        setCurrentRate(null);
        toast.success("Shipping Rate added successfully")
    };

    const handleEditRate = (rate: ShippingRate) => {
        updateShippingRates([...shippingRates.filter((r) => r.id !== rate.id), rate])
        setCurrentRate(null);
        toast.success("Shipping rate updated successfully")
    };

    const handleDeleteRate = (id: string) => {
        updateShippingRates(shippingRates.filter((rate) => rate.id !== id));
        toast.success("Shipping rate deleted successfully")
    };

    const handleReorder = (newRates: ShippingRate[]) => {
        setShippingRates(newRates);
    };

    const shippingRatesTableEl = loading ? <Loader/> : <ShippingRateTable
        shippingRates={shippingRates}
        onEdit={handleEditRate}
        onDelete={handleDeleteRate}
        onReorder={handleReorder}
    />

    return (
        <div
            className="p-6 rounded-lg max-w-4xl mx-auto flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2 items-center">
                <div className="text-2xl font-bold text-center" style={{
                    color: "#0e153a"
                }}>
                    Shipping Rate Management
                </div>
                <p className="text-black w-1/2 text-center">Manage and configure shipping rates effortlessly. Add,
                    edit, and organize rates with ease for
                    streamlined operations.</p>
            </div>
            <ShippingRateForm onSubmit={handleAddRate} initialValues={currentRate}/>
            {shippingRatesTableEl}
            <ToastContainer/>
        </div>
    );
};

export default ShippingRatesManagement;
