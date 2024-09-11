import React from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import {ShippingRate} from "../../types";
import {INITIAL_FORM_VALUES, SHIPPING_RATES} from "../../constants";
import {shippingRateSchema} from "../../validation/shippingRateSchema";
import Button from "../Button";
import CurrencyInput from "../CurrencyInput";


interface FormProps {
    onSubmit: (data: ShippingRate) => void;
    initialValues?: ShippingRate;
}

const ShippingRateForm: React.FC<FormProps> = ({onSubmit, initialValues}) => {
    const initialFormValues: ShippingRate = initialValues || INITIAL_FORM_VALUES;

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={shippingRateSchema}
            validateOnMount
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm();
            }}
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form className="mx-auto bg-white p-6 shadow-lg rounded-lg space-y-4">
                    <div className="flex flex-col gap-y-2">
                        <label className="block text-sm font-medium text-gray-700">Shipping Rate</label>
                        <Field
                            as="select"
                            name="rateType"
                            className="block w-full p-3 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition duration-150 ease-in-out"
                        >
                            <option value={SHIPPING_RATES.STANDARD.value}>
                                {SHIPPING_RATES.STANDARD.label}
                            </option>
                            <option value={SHIPPING_RATES.EXPRESS.value}>
                                {SHIPPING_RATES.EXPRESS.label}
                            </option>
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
                    />

                    <div className="flex flex-col gap-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Shipping Timeframe (Days)
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
                        label={initialValues ? "Update" : "Save"}
                        variant="primary"
                        disabled={isSubmitting || !isValid || initialValues && !dirty}
                        className="w-full"
                    />
                </Form>

            )}
        </Formik>
    );
};

export default ShippingRateForm;
