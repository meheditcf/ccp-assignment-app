import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import ShippingRatesManagement from "./components/ShippingRatesManagement";
import {ShippingRatesProvider} from "./context/ShippingRatesContext";

const App: React.FC = () => {
    return (
        <ShippingRatesProvider>
            <ShippingRatesManagement/>
        </ShippingRatesProvider>
    )
}

export default App;
