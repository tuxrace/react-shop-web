import React from 'react'
import App from './App';
import { render } from '@testing-library/react';

describe('App', () => {
    test('rendered App', async () =>{
        const { container } = render(<App/>);
        expect(container).toBeDefined();
    })
});
