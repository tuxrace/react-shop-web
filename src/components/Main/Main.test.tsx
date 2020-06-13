import React from 'react'
import Main from './Main';
import { render, cleanup,  fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import { plainToClass } from 'class-transformer';
import { Product } from '../../class/Product';

describe('Main', () => {
    afterEach(cleanup)
    const dataArray = [
      {
        "image": "http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-1.jpg",
        "price": "15",
        "currency": "SGD",
        "name": "IPhone 7"
      },
      {
        "image": "http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-2.jpg",
        "price": "25",
        "currency": "SGD",
        "name": "3 Soldiers Toy"
      },
      {
        "image": "http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-3.jpg",
        "price": "12.5",
        "currency": "SGD",
        "name": "Cool T-Shirt"
      },
      {
        "image": "http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-2.jpg",
        "price": "25",
        "currency": "SGD",
        "name": "Another Toy"
      },
      {
        "image": "http://s3-ap-southeast-1.amazonaws.com/s3.irvinsaltedegg.com/engineering-test/images/product-3.jpg",
        "price": "12.5",
        "currency": "SGD",
        "name": "Another T-Shirt"
      }
    ];
    const props = {
      data: plainToClass(Product, dataArray),
    }
    
    
    test('Rendered Main Shopping cart', async () => {
        const { getByText, debug } = render(<Main {...props}/>);
        expect(getByText('SHOPPING CART')).toBeInTheDocument();
        debug();
    })

    test('Expect item to show on add to cart click', async () => {
      const { getByTestId } = render(<Main {...props}/>);
      const selectedItem = 'IPhone 7';

      fireEvent.click(getByTestId(`button-addCart-${selectedItem}`));
      expect(getByTestId(`qty-0`)).toBeInTheDocument();
    })

    test('Expect price to update when quantity change', async () => {
      const { getByTestId } = render(<Main {...props}/>);
      const selectedItem = '3 Soldiers Toy';
      const changedPrice = '50';

      fireEvent.click(getByTestId(`button-addCart-${selectedItem}`));
      expect(getByTestId(`qty-0`)).toBeInTheDocument();

      fireEvent.change(getByTestId(`qty-0`), {target: {value: '2'}});
      expect(getByTestId(`price-0`).textContent).toEqual(changedPrice);
    })

    test('Expect item to disappear when remove clicked', async () => {
      const { getByTestId } = render(<Main {...props}/>);
      const selectedItem = '3 Soldiers Toy';
      
      fireEvent.click(getByTestId(`button-addCart-${selectedItem}`));
      expect(getByTestId(`qty-0`)).toBeInTheDocument();

      fireEvent.click(getByTestId(`button-0`));
      const removeButton = screen.queryByText('X');
      expect(removeButton).not.toBeInTheDocument()
    })

});
