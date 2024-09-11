import React, {useState, useMemo} from "react";
import ShippingRateForm from "./ShippingRateForm";
import ShippingRateTableHeader from "./ShippingRateTableHeader";
import ShippingRateRow from "./ShippingRateTableRow";
import {ShippingRate} from "../../types";
import Modal from "../Modal";
import Pagination from "../Pagination";
import Button from "../Button";

interface TableProps {
    shippingRates: ShippingRate[];
    onEdit: (data: ShippingRate) => void;
    onDelete: (id: string) => void;
    onReorder: (newRates: ShippingRate[]) => void;
}

interface SortingFilter {
    column: keyof ShippingRate;
    order: 'asc' | 'desc';
}

const ShippingRateTable: React.FC<TableProps> = ({
                                                     shippingRates,
                                                     onEdit,
                                                     onDelete,
                                                     onReorder
                                                 }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [rateToDelete, setRateToDelete] = useState<string | null>(null);
    const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

    // Sorting state
    const [sortingFilter, setSortingFilter] = useState<SortingFilter>({
        column: 'rateType',
        order: 'asc'
    });

    // Sorting function
    const sortedRates = useMemo(() => {
        return [...shippingRates].sort((a, b) => {
            const {column, order} = sortingFilter;
            const valueA = a[column];
            const valueB = b[column];

            const compare = (valueA > valueB ? 1 : -1);
            return order === 'asc' ? compare : -compare;
        });
    }, [shippingRates, sortingFilter]);

    // Pagination calculation
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const indexOfLastRate = currentPage * rowsPerPage;
    const indexOfFirstRate = indexOfLastRate - rowsPerPage;
    const currentRates = sortedRates.slice(indexOfFirstRate, indexOfLastRate);


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
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (rateId: string) => {
        setRateToDelete(rateId);
        setIsDeleteModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedRate(null);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setRateToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (rateToDelete) {
            onDelete(rateToDelete);
            setIsDeleteModalOpen(false);
            setRateToDelete(null);
        }
    };

    const handleFormSubmit = (updatedRate: ShippingRate) => {
        onEdit(updatedRate);
        setIsEditModalOpen(false);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSort = (column: keyof ShippingRate) => {
        setSortingFilter(prev => ({
            column,
            order: prev.column === column ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc'
        }));
    };

    if (!shippingRates || !shippingRates.length) {
        return <div className="text-center text-black">No shipping rate available!</div>;
    }


    return (
        <div className="flex flex-col items-center mx-auto w-full">
            <div className="w-full overflow-x-auto lg:overflow-x-visible">
                <table className="table-auto bg-white p-6 shadow-lg rounded-lg mx-auto w-full min-w-[640px]">
                    <ShippingRateTableHeader
                        onSort={handleSort}
                        sortingFilter={sortingFilter}
                    />
                    <tbody>
                    {currentRates.map((rate, index) => (
                        <ShippingRateRow
                            key={rate.id}
                            rate={rate}
                            index={index}
                            onEdit={handleEditClick}
                            onDelete={() => handleDeleteClick(rate.id)}
                            onDragStart={handleDragStart}
                            onDrop={handleDrop}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose} header="Edit Shipping Rate">
                {selectedRate && (
                    <ShippingRateForm
                        onSubmit={handleFormSubmit}
                        initialValues={selectedRate}
                    />
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} header="Confirm Delete">
                <p className="text-gray-700">Are you sure you want to delete this shipping rate?</p>
                <div className="flex justify-end gap-x-4 mt-4">
                    <Button
                        label="Cancel"
                        variant="secondary"
                        onClick={handleDeleteModalClose}
                    />
                    <Button
                        label="Delete"
                        variant="danger"
                        onClick={handleConfirmDelete}
                    />
                </div>
            </Modal>

            {/* Pagination Controls */}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(sortedRates.length / rowsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ShippingRateTable;
