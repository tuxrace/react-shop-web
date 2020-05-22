import React from 'react'
import Cart from './Cart';
import { render, fireEvent } from '@testing-library/react';
import { Product } from '../../class/Product';
import { plainToClass } from 'class-transformer';

describe('Cart', () => {
    const product = plainToClass(Product, {
        name: 'IPhone 7',
        image: 'http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-1.jpg',
        price: '15',
        currency: 'SGD',
    })

    const props = {
        cartItems: [product],
        handleRemove: jest.fn()
    }
    
    test('rendered Cart', async () =>{
        const { container } = render(<Cart {...props}/>);
        expect(container).toBeDefined();
    })

    test('cart loaded', async() => {
        const { getByText } = render(<Cart {...props}/>);
        expect(getByText('SHOPPING CART')).toBeDefined();
    })

    test('remove clicked', async () => {
        const { container, getByTestId } = render(<Cart {...props}/>);
        fireEvent.click(getByTestId('button-0'));
        expect(container).toBeDefined();
    });

    test('quantity changed', async () => {
        const { container, getByTestId } = render(<Cart {...props}/>);
        fireEvent.change(getByTestId('qty-0'), { target: { value: '1' }} );
        expect(container).toBeDefined();
    });
});
