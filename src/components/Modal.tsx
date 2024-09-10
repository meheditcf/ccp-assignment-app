import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    header: string;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, header, children}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col gap-y-4 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex justify-between relative">
                    <div className="text-black font-bold text-center text-lg">{header}</div>
                    <button
                        onClick={onClose}
                        className="text-lg text-gray-500 hover:text-gray-700"
                        title="Close"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
