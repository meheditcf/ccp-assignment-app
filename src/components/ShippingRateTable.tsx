import React, {useState} from "react";
import {ShippingRate} from "../types";
import Modal from "./Modal";
import ShippingRateForm from "./ShippingRateForm";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "./Pagination";
import ShippingRateTableHeader from "./ShippingRateTableHeader";
import ShippingRateRow from "./ShippingRateTableRow";

interface TableProps {
    shippingRates: ShippingRate[];
    onEdit: (data: ShippingRate) => void;
    onDelete: (id: string) => void;
    onReorder: (newRates: ShippingRate[]) => void;
}

const ShippingRateTable: React.FC<TableProps> = ({shippingRates, onEdit, onDelete, onReorder}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Get paginated data
    const indexOfLastRate = currentPage * rowsPerPage;
    const indexOfFirstRate = indexOfLastRate - rowsPerPage;
    const currentRates = shippingRates.slice(indexOfFirstRate, indexOfLastRate);

    const isDataAvailable = shippingRates && shippingRates.length > 0;


    // Drag and Drop Handlers
    const handleDragStart = (index: number) => {
        setDraggedItemIndex(index);
    };

    const handleDrop = (index: number) => {
        if (draggedItemIndex === null || draggedItemIndex === index) return;

        const updatedRates = [...shippingRates];
        const draggedItem = updatedRates[draggedItemIndex];

        // Remove dragged item and insert it at the new index
        updatedRates.splice(draggedItemIndex, 1);
        updatedRates.splice(index, 0, draggedItem);

        onReorder(updatedRates); // Update parent state with the reordered list
        setDraggedItemIndex(null);
    };

    const handleEditClick = (rate: ShippingRate) => {
        setSelectedRate(rate);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedRate(null);
    };

    const handleFormSubmit = (updatedRate: ShippingRate) => {
        onEdit(updatedRate);
        setModalOpen(false);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };


    if (!isDataAvailable) {
        return <div className="text-center text-gray-500">No shipping rates available</div>
    }

    return (
        <>
            <table className="table-auto bg-white shadow-md rounded-md mx-auto">
                <ShippingRateTableHeader/>
                <tbody>
                {currentRates.map((rate, index) => (
                    <ShippingRateRow
                        key={rate.id}
                        rate={rate}
                        index={index}
                        onEdit={handleEditClick}
                        onDelete={onDelete}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                    />
                ))}
                </tbody>
            </table>

            <Modal isOpen={isModalOpen} onClose={handleModalClose} header="Edit Shipping Rate">
                {selectedRate && (
                    <ShippingRateForm
                        onSubmit={handleFormSubmit}
                        initialValues={selectedRate}
                    />
                )}
            </Modal>

            {/* Pagination Controls */}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(shippingRates.length / rowsPerPage)}
                onPageChange={handlePageChange}
            />

            <ToastContainer/>
        </>
    );
};

export default ShippingRateTable;
