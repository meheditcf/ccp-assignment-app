import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {describe, it, expect, vi} from 'vitest';
import Pagination from "../../components/Pagination";

describe('Pagination', () => {
    const onPageChange = vi.fn();

    it('renders correctly with pages', () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={5}
                onPageChange={onPageChange}
            />
        );

        // Check if buttons are rendered
        expect(screen.getByText(/Prev/i)).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(7); // 5 page buttons + Prev + Next
    });

    it('disables Prev button on first page', () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={5}
                onPageChange={onPageChange}
            />
        );

        // Check if Prev button is disabled
        const prevButton = screen.getByText(/Prev/i);
        expect(prevButton).toBeDisabled();
    });

    it('disables Next button on last page', () => {
        render(
            <Pagination
                currentPage={5}
                totalPages={5}
                onPageChange={onPageChange}
            />
        );

        // Check if Next button is disabled
        const nextButton = screen.getByText(/Next/i);
        expect(nextButton).toBeDisabled();
    });

    it('calls onPageChange with correct page number', () => {
        render(
            <Pagination
                currentPage={2}
                totalPages={5}
                onPageChange={onPageChange}
            />
        );

        // Click on page 3
        fireEvent.click(screen.getByText(/3/i));
        expect(onPageChange).toHaveBeenCalledWith(3);

        // Click on Prev button
        fireEvent.click(screen.getByText(/Prev/i));
        expect(onPageChange).toHaveBeenCalledWith(1);

        // Click on Next button
        fireEvent.click(screen.getByText(/Next/i));
        expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it('highlights the current page button', () => {
        render(
            <Pagination
                currentPage={3}
                totalPages={5}
                onPageChange={onPageChange}
            />
        );

        // Check if the button for page 3 is highlighted
        expect(screen.getByText(/3/i)).toHaveClass('bg-blue-500 text-white');
    });
});
