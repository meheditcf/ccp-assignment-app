import React, {useMemo} from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {

    // Memoize pages array to avoid recalculation on every render
    const pages = useMemo(() => Array.from({length: totalPages}, (_, index) => index + 1), [totalPages]);

    // Determine if buttons should be disabled
    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;

    return (
        <div className="flex justify-center my-4">
            <button
                className={`px-4 py-2 mx-1 rounded ${isPrevDisabled ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:text-blue-700"}`}
                onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
                disabled={isPrevDisabled}
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "text-blue-500 hover:bg-blue-100"}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={`px-4 py-2 mx-1 rounded ${isNextDisabled ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:text-blue-700"}`}
                onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
                disabled={isNextDisabled}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
