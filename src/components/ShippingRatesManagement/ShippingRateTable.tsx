import React, {useState, useMemo} from "react";
import ShippingRateForm from "./ShippingRateForm";
import ShippingRateTableHeader from "./ShippingRateTableHeader";
import ShippingRateRow from "./ShippingRateTableRow";
import {ShippingRate, SortingFilter} from "../../types";
import Modal from "../Modal";
import Pagination from "../Pagination";
import Button from "../Button";
import {useShippingRates} from "../../hooks/useShippingRates";
import {PAGINATION_CONFIG, SORTING_CONFIG} from "../../constants";
import {handleDragAndDrop, paginateShippingRates, sortShippingRates} from "../../utils";

const ShippingRateTable: React.FC = () => {
    const {
        shippingRates,
        handleReorder,
        handleDelete
    } = useShippingRates();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [rateToDelete, setRateToDelete] = useState<number | null>(null);
    const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

    const [sortingFilter, setSortingFilter] = useState<SortingFilter>({
        key: SORTING_CONFIG.KEYS.RATE_TYPE,
        order: SORTING_CONFIG.ORDERS.ASCENDING
    });
    const [currentPage, setCurrentPage] = useState<number>(PAGINATION_CONFIG.PAGE_NUMBER);

    // Memoized sorted and paginated rates
    const sortedRates = useMemo(() => sortShippingRates(shippingRates, sortingFilter), [shippingRates, sortingFilter]);
    const currentRates = useMemo(() => paginateShippingRates(sortedRates, currentPage), [sortedRates, currentPage]);

    const handleSort = (key: string) => {
        const {
            ASCENDING,
            DESCENDING
        } = SORTING_CONFIG.ORDERS
        setSortingFilter(prev => ({
            key,
            order: prev.key === key ? (prev.order === ASCENDING ? DESCENDING : ASCENDING) : ASCENDING
        }));
    };

    // Drag and drop handlers
    const handleDragStart = (index: number) => {
        setDraggedItemIndex(index);
    };
    const handleDrop = (index: number) => handleDragAndDrop(draggedItemIndex, index, shippingRates, handleReorder);

    // Edit and delete handlers
    const handleEditClick = (rate: ShippingRate) => {
        setSelectedRate(rate);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (rateId: number) => {
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
            handleDelete(rateToDelete);
            setIsDeleteModalOpen(false);
            setRateToDelete(null);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (!shippingRates || shippingRates.length === 0) {
        return null;
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
                        selectedRate={selectedRate}
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
                totalPages={Math.ceil(sortedRates.length / PAGINATION_CONFIG.PAGE_SIZE)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ShippingRateTable;
