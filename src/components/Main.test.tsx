import React from 'react'
import Main from './Main';
import { render } from '@testing-library/react';
import axios from 'axios';
import { API_URL } from '../constants';

jest.mock('axios');

// mock window.location
delete window.location;
window.location = new URL(`https://${API_URL}`)

describe('Main', () => {
    const props = {
    }
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
      }
    
    test('rendered Main', async () =>{
        
        axios.get.mockImplementationOnce(() => Promise.resolve({data: data}));
        const { container } = render(<Main {...props}/>);
        expect(container).toBeDefined();
    })
});
