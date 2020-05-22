import React, { useState } from 'react'
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, Typography} from '@material-ui/core';
import { Product } from '../../class/Product';

import './Cart.scss'

interface Props {
    cartItems: Product[];
    handleRemove: any;
}

interface ItemTotal {
    [index: string]: string;
}

const Cart: React.FC<Props> = (props) => {
    const { cartItems, handleRemove } = props;
    const [itemTotal, setItemTotal] = useState<ItemTotal>({});

    const getItem = (id: string) => {
        const item = cartItems.find(item => item.getName() === id);
        return item;
    }

    const getItemTotal = (value: string, price: string) => {
        const result = parseFloat(value) * parseFloat(price);
        return String(result)
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        const itemInfo = getItem(id);

        if(itemInfo){
            const newItemTotal = {
                ...itemTotal,
                [id]: getItemTotal(value, itemInfo.getPrice())
            };
            setItemTotal(newItemTotal);
        }
    }

    const getMainTotal = () => {
        return Object.keys(itemTotal).reduce((acc: string, cur: string) => {
            acc = String(parseFloat(itemTotal[cur]) + parseFloat(acc))
            return acc
        }, "0");
    }

    const onHandleRemove = (id: string) => {
        const newItemTotal = itemTotal;
        delete newItemTotal[id];
        console.log(newItemTotal)
        setItemTotal(newItemTotal);
        handleRemove(id);
    }

    const renderProduct = (item: Product) => {
        return (
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <img height={40} src={item.getImage()} alt={item.getName()} />
                </Grid>
                <Grid item>
                    <strong>{item.getName()}</strong>
                </Grid>
            </Grid>
        )
    }

    return (
        <div className="cartRoot">
            <Grid container className="" justify="center" direction="column" spacing={3}>
                <Grid item> SHOPPING CART</Grid>
                <Grid item> 
                        <Table className="tableCart">
                            <TableHead>
                                <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {cartItems.map((item, idx) => (
                                <TableRow key={item.getName()}>
                                <TableCell component="th" scope="row">
                                    <button data-testid={`button-${idx}`} onClick={() => onHandleRemove(item.getName())}> {"X"} </button>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {renderProduct(item)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <strong> 
                                    {`${item.getCurrency()} ${parseFloat(item.getPrice()).toFixed(2)}`}
                                    </strong>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <input data-testid={`qty-${idx}`} id={item.getName()} type="text" className="inputQuantity" onChange={handleQuantityChange}></input>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {itemTotal[item.getName()]}
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                            <TableBody>
                                <TableRow key="total">
                                <TableCell colSpan={5} component="th" scope="row">
                                    <Grid container justify="flex-end">
                                        <Typography variant="h6">
                                            {getMainTotal()}
                                        </Typography>
                                    </Grid>
                                </TableCell>
                                </TableRow>
                            
                            </TableBody>
                        </Table>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cart;
