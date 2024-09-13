import React, {useEffect, useRef} from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    header: string;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, header, children}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close the modal when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="flex flex-col gap-y-4 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
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
