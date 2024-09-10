import React from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import {ShippingRate} from "../types";
import {INITIAL_FORM_VALUES, SHIPPING_RATES} from "../constants";
import {shippingRateSchema} from "../validation/shippingRateSchema";
import Button from "./Button";

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
            {({isSubmitting, isValid}) => (
                <Form className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-1">
                        <label className="block text-gray-700">Shipping Rate:</label>
                        <Field
                            as="select"
                            name="rateType"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value={SHIPPING_RATES.STANDARD.value}>{SHIPPING_RATES.STANDARD.label}</option>
                            <option value={SHIPPING_RATES.EXPRESS.value}>{SHIPPING_RATES.EXPRESS.label}</option>
                        </Field>
                        <ErrorMessage
                            name="rateType"
                            component="div"
                            className="text-red-600 text-sm mt-1"
                        />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <label className="block text-gray-700">Price ($):</label>
                        <Field
                            type="number"
                            name="price"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage
                            name="price"
                            component="div"
                            className="text-red-600 text-sm mt-1"
                        />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <label className="block text-gray-700">Shipping Timeframe (Days):</label>
                        <div className="flex space-x-2">
                            <Field
                                type="number"
                                name="timeFrom"
                                placeholder="From"
                                className="block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <Field
                                type="number"
                                name="timeTo"
                                placeholder="To"
                                className="block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <ErrorMessage
                            name="timeFrom"
                            component="div"
                            className="text-red-600 text-sm mt-1"
                        />
                        <ErrorMessage
                            name="timeTo"
                            component="div"
                            className="text-red-600 text-sm mt-1"
                        />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <label className="block text-gray-700">
                            Free Shipping Above Order Value ($):
                        </label>
                        <Field
                            type="number"
                            name="freeShippingAmount"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage
                            name="freeShippingAmount"
                            component="div"
                            className="text-red-600 text-sm mt-1"
                        />
                    </div>

                    <Button
                        type="submit"
                        label={initialValues ? "Update" : "Save"}
                        variant="primary"
                        disabled={isSubmitting || !isValid}

                    />
                </Form>)
            }
        </Formik>
    );
};

export default ShippingRateForm;
