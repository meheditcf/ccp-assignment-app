import * as Yup from "yup";
import {ShippingRateFormValues} from "../types";

export const shippingRateSchema: Yup.SchemaOf<ShippingRateFormValues> = Yup.object({
    rateType: Yup.string().required("Shipping rate is required"),
    price: Yup.number().required("Price is required").min(1, "Price must be greater than 0"),
    timeFrom: Yup.number().required("Is required").min(0, "Must be greater than or equal to 0"),
    timeTo: Yup.number()
        .required("Is required")
        .min(0)
        .test(
            'is-greater-than-or-equal',
            "The start date must be less than or equal to the end date",
            function (value) {
                const {timeFrom} = this.parent;
                return value >= timeFrom;
            }
        ),
    freeShippingAmount: Yup.number().min(0, "Must be greater than or equal to 0"),
});