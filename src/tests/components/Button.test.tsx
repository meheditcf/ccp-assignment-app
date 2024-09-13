// @ts-ignore
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Button from "../../components/Button";
import {describe, it, expect, vi} from 'vitest';


describe('Button Component', () => {
    it('renders correctly with the provided label', () => {
        render(<Button label="Click Me"/>);
        const buttonElement = screen.getByText('Click Me');
        expect(buttonElement).toBeInTheDocument();
    });

    it('renders with the correct type', () => {
        render(<Button label="Submit" type="submit"/>);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveAttribute('type', 'submit');
    });

    it('renders with the correct variant styles', () => {
        render(<Button label="Primary" variant="primary"/>);
        const buttonElement = screen.getByText('Primary');
        expect(buttonElement).toHaveClass('bg-primary text-white');
    });

    it('renders with the correct size styles', () => {
        render(<Button label="Large Button" size="lg"/>);
        const buttonElement = screen.getByText('Large Button');
        expect(buttonElement).toHaveClass('py-3 px-8 text-lg');
    });

    it('handles click events', () => {
        const handleClick = vi.fn();
        render(<Button label="Click Me" onClick={handleClick}/>);
        const buttonElement = screen.getByText('Click Me');
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders disabled button', () => {
        render(<Button label="Disabled" disabled/>);
        const buttonElement = screen.getByText('Disabled');
        expect(buttonElement).toBeDisabled();
        expect(buttonElement).toHaveClass('pointer-events-none opacity-50');
    });
});
