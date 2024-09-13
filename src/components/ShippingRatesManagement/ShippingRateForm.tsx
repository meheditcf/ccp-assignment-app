import React from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import {ShippingRate} from "../../types";
import {INITIAL_FORM_VALUES, SHIPPING_RATES} from "../../constants";
import {shippingRateSchema} from "../../validation/shippingRateSchema";
import Button from "../Button";
import CurrencyInput from "../CurrencyInput";
import {useShippingRates} from "../../hooks/useShippingRates";

interface ShippingRateFormProps {
    selectedRate?: ShippingRate;
}

const ShippingRateForm: React.FC<ShippingRateFormProps> = ({selectedRate}) => {
    const {
        handleAdd,
        loading,
        handleEdit
    } = useShippingRates();

    const initialFormValues: ShippingRate = selectedRate || INITIAL_FORM_VALUES;
    const handleSubmit = (formValues) => {
        if (selectedRate) {
            handleEdit(formValues);
        } else {
            handleAdd(formValues);
        }
    }

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={shippingRateSchema}
            validateOnMount
            onSubmit={(values, {resetForm}) => {
                handleSubmit(values);
                resetForm();
            }}
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form className="mx-auto bg-white p-6 shadow-lg rounded-lg space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="rateType" className="block text-sm font-medium text-gray-700">
                            Shipping Rate <span className="text-red-500 font-bold text-md">*</span>
                        </label>
                        <Field
                            as="select"
                            name="rateType"
                            id="rateType"
                            className="block w-full p-3 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition duration-150 ease-in-out"
                        >
                            {Object.values(SHIPPING_RATES).map((rate) => (
                                <option key={rate.value} value={rate.value}>
                                    {rate.label}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage
                            name="rateType"
                            component="div"
                            className="text-red-500 text-xs"
                        />
                    </div>
                    <CurrencyInput
                        label="Price"
                        name="price"
                        required
                    />
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Shipping Timeframe (Days) <span className="text-red-500 font-bold text-md">*</span>
                        </label>
                        <div className="flex space-x-4">
                            <Field
                                type="number"
                                name="timeFrom"
                                placeholder="From"
                                className="block w-full p-3 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition duration-150 ease-in-out"
                            />
                            <Field
                                type="number"
                                name="timeTo"
                                placeholder="To"
                                className="block w-full p-3 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition duration-150 ease-in-out"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <ErrorMessage
                                name="timeFrom"
                                component="div"
                                className="text-red-500 text-xs w-1/2"
                            />
                            <ErrorMessage
                                name="timeTo"
                                component="div"
                                className="text-red-500 text-xs w-1/2"
                            />
                        </div>
                    </div>
                    <CurrencyInput
                        label="Free Shipping Above Order Value"
                        name="freeShippingAmount"
                    />
                    <Button
                        type="submit"
                        label={selectedRate ? "Update" : "Save"}
                        variant="primary"
                        disabled={isSubmitting || !isValid || selectedRate && !dirty || loading}
                        className="w-full"
                    />
                </Form>

            )}
        </Formik>
    );
};

export default ShippingRateForm;
