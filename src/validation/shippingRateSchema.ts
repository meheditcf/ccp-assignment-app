import * as Yup from "yup";
import {ShippingRateFormValues} from "../types";

export const shippingRateSchema: Yup.SchemaOf<ShippingRateFormValues> = Yup.object({
    rateType: Yup.number().required("Shipping rate is required"),
    price: Yup.number().required("Price is required").min(0, "Price can't be negative"),
    timeFrom: Yup.number()
        .required("Is required")
        .min(0, "Can't be negative")
        .test(
            'is-less-than-or-equal',
            "Start date must be less than or equal to End date",
            (timeFrom, {parent}) => timeFrom <= parent.timeTo
        ),
    timeTo: Yup.number()
        .required("Is required")
        .min(0, "Can't be negative")
        .test(
            'is-greater-than-or-equal',
            "End date must be greater than or equal to Start date",
            (timeTo, {parent}) => timeTo >= parent.timeFrom
        ),
    freeShippingAmount: Yup.number().min(0, "Can't be negative"),
});