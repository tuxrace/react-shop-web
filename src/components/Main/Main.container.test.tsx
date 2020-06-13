import React from 'react'
import { render } from '@testing-library/react'
import axios from 'axios'
import MainContainer from './Main.container';
import { API_URL } from '../../constants';

jest.mock('axios');

// mock window.location
delete window.location;
window.location = new URL(`https://${API_URL}`)

describe('Main Container', () => {
    const data = {
        "data": [
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
        ]
      };

    test('Main container', async () => {
        axios.get.mockResolvedValue({ data: data });
        const { container } = render(<MainContainer />);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(container).toBeInTheDocument();
    });
});