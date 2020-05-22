import React from 'react'
import ProductTile from './ProductTile';
import { render, fireEvent } from '@testing-library/react';
import { Product } from '../../class/Product';
import { plainToClass } from 'class-transformer';

describe('ProductTitle', () => {
    const product = plainToClass(Product, {
        name: 'IPhone 7',
        image: 'http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-1.jpg',
        price: '15',
        currency: 'SGD',
    })
    const props = {
        data: product,
        handleClick: jest.fn()
    }
    test('rendered ProductTitle', async () =>{
        const { container } = render(<ProductTile {...props}/>);
        expect(container).toBeDefined();
    })

    test('click add to car', async () =>{
        const { container, getByTestId } = render(<ProductTile {...props}/>);
        fireEvent.click(getByTestId('button-addCart-IPhone 7'));
        expect(container).toBeDefined();
    })
});
