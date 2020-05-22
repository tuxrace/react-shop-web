import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import { API_URL, PRODUCTS_PER_PAGE } from '../constants';
import { plainToClass } from 'class-transformer';
import { Product } from '../class/Product';
import ProductTile from './ProductTile';
import Cart from './Cart';

import './Main.scss';

const Main  = () => {
    const [data, setData] = useState<Product[] | []>([]);
    const [cartItems, setCartItems] = useState<Product[] | []>([]);

    useEffect(() => {
        async function getData (){
            let protocol = 'http://';
            if (window.location.protocol === "https:") {
                protocol = "https://";
            }
            const response = await axios.get(`${protocol}${API_URL}`).then((result: AxiosResponse) => {
                const { data } = result.data;
                return plainToClass(Product, data as Object[]);
            });
            setData(response);
        }
        getData();
    }, []);
    
    const handleClick = (data: Product) => {
       if (cartItems.filter(item => item.getName() === data.getName()).length === 0){
            setCartItems([...cartItems, data]);
       }
    }

    const handleRemove = (id: string) => {
        const newCartItems = cartItems.filter(item => item.getName() !== id);
        setCartItems(newCartItems);
    }

    const [mainProduct, ...restOfProducts] = data && data.slice(0, PRODUCTS_PER_PAGE);

    return (
        <div className="mainRoot">
            {data && data.length > 0 ? (
                <Grid container>
                    <Grid item  container xs={3} justify="space-around">
                        <ProductTile data={restOfProducts[0]} handleClick={handleClick} />
                        <ProductTile data={restOfProducts[2]} handleClick={handleClick} />
                    </Grid>
                    <Grid item container xs={6} justify="center"> 
                        <ProductTile data={mainProduct} handleClick={handleClick} />
                    </Grid>
                    <Grid item container xs={3} justify="space-around">
                        <ProductTile data={restOfProducts[1]} handleClick={handleClick} />
                        <ProductTile data={restOfProducts[3]} handleClick={handleClick} />
                    </Grid>
                </Grid>
            ) : '' }
            <Divider className="divider" />
            <Cart cartItems={cartItems} handleRemove={handleRemove} />
        </div>
        
    )
}

export default Main
