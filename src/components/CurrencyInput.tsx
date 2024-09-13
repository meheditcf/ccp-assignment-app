import React from 'react';
import {Field, ErrorMessage} from 'formik';

interface CurrencyInputProps {
    label: string;
    name: string;
    symbol?: string;
    placeholder?: string;
    required?: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
                                                         label, name,
                                                         symbol = '$',
                                                         placeholder = '0.00',
                                                         required = false
                                                     }) => {
    return (
        <div className="flex flex-col gap-y-2">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500 font-bold text-md">*</span>}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
                    <span className="text-gray-700">{symbol}</span>
                </div>
                <Field
                    type="number"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    className="block w-full pl-9 p-3 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition duration-150 ease-in-out"
                />
            </div>
            <ErrorMessage name={name} component="div" className="text-red-500 text-xs"/>
        </div>
    );
};

export default CurrencyInput;
