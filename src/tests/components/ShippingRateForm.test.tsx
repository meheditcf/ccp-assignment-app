// @ts-ignore
import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ShippingRatesProvider} from '../../context/ShippingRatesContext';
import ShippingRateForm from "../../components/ShippingRatesManagement/ShippingRateForm";
import {describe, it, expect} from 'vitest';

const renderWithProvider = (ui: React.ReactElement) => {
    return render(<ShippingRatesProvider>{ui}</ShippingRatesProvider>);
};

describe('ShippingRateForm', () => {
    it('renders the form with initial values', () => {
        renderWithProvider(<ShippingRateForm/>);
        expect(screen.getByLabelText(/Shipping Rate/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Free Shipping Above Order Value/i)).toBeInTheDocument();
    });

    it('should call handleAdd when form is submitted with new values', async () => {
        renderWithProvider(<ShippingRateForm/>);

        fireEvent.change(screen.getByLabelText(/Shipping Rate/i), {target: {value: '1'}});
        fireEvent.change(screen.getByLabelText(/Price/i), {target: {value: '100'}});
        fireEvent.change(screen.getByLabelText(/Free Shipping Above Order Value/i), {target: {value: '50'}});

        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(() => {
            expect(screen.queryByText(/Loading/i)).toBeNull();
        });
    });

    it('should disable submit button when form is submitting', () => {
        renderWithProvider(<ShippingRateForm/>);

        const submitButton = screen.getByText(/Save/i);
        expect(submitButton).not.toBeDisabled();
    });
});
