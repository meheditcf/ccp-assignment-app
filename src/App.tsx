import React, {useState} from "react";
import ShippingRateForm from "./components/ShippingRateForm";
import ShippingRateTable from "./components/ShippingRateTable";
import {ShippingRate} from "./types";
import {toast} from "react-toastify";

const App: React.FC = () => {
    const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
    const [currentRate, setCurrentRate] = useState<ShippingRate | null>(null);

    const handleAddRate = (rate: ShippingRate) => {
        setShippingRates((prevRates) => [...prevRates, {...rate, id: Date.now()}]);
        setCurrentRate(null);
        toast.success("Shipping Rate added successfully")
    };

    const handleEditRate = (rate: ShippingRate) => {
        setShippingRates([...shippingRates.filter((r) => r.id !== rate.id), rate])
        setCurrentRate(rate);
        toast.success("Shipping rate updated successfully")
    };

    const handleDeleteRate = (id: string) => {
        setShippingRates((prevRates) => prevRates.filter((rate) => rate.id !== id));
    };

    const handleReorder = (newRates: ShippingRate[]) => {
        setShippingRates(newRates);
    };

    return (
        <div className="flex flex-col gap-y-4 p-4">
            <div className="text-black font-bold text-center text-lg">Shipping Rate Management</div>
            <ShippingRateForm onSubmit={handleAddRate} initialValues={currentRate}/>
            <ShippingRateTable
                shippingRates={shippingRates}
                onEdit={handleEditRate}
                onDelete={handleDeleteRate}
                onReorder={handleReorder}
            />
        </div>
    );
};

export default App;
