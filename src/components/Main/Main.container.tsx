import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { API_URL } from '../../constants';
import { Product } from '../../class/Product';
import Main from './Main';

const MainContainer = () => {
    const [ data, setData ] = useState<Product[]>([]);

    useEffect(() => {
        const getData = async function (){
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

    return (
        <Main data={data} />
    )
}

export default MainContainer;