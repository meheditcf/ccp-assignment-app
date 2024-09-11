import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const pages = Array.from({length: totalPages}, (_, index) => index + 1);

    return (
        <div className="flex justify-center my-4">
            <button
                className={`px-4 py-2 mr-2 ${
                    currentPage === 1
                        ? "text-black cursor-not-allowed"
                        : "text-blue-500 hover:text-blue-700"
                }`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 mx-1 ${
                        currentPage === page
                            ? "bg-blue-500 text-white"
                            : "text-blue-500 hover:bg-blue-100"
                    } rounded`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={`px-4 py-2 ml-2 ${
                    currentPage === totalPages
                        ? "text-black cursor-not-allowed"
                        : "text-blue-500 hover:text-blue-700"
                }`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
