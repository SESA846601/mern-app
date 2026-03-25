import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
    test('renders without crashing', () => {
        render(<App />);
    });

    test('renders welcome message', () => {
        render(<App />);
        const element = screen.getByText(/welcome/i);
        expect(element).toBeInTheDocument();
    });
});