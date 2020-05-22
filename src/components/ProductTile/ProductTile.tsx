import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Product } from '../../class/Product';
import './ProductTile.scss';
import { Typography } from '@material-ui/core';

interface Props {
    data: Product, 
    handleClick: (data: Product) => void
}

const ProductTile: React.FC<Props> = (props) => {
    const { data, handleClick } = props;
    const onHandleClick = () => {
        handleClick(data);
    }
    return (
        <Grid className="productTileRoot">
            <img src={ data.getImage()} alt={data.getName()}/>
            <Grid container className="productTileBottom">
                <div className="productTileNamePrice">
                    <Typography variant="body1" className="productName"><strong>{data.getName().toUpperCase()}</strong></Typography>
                    <Typography variant="body1">{`${data.getCurrency()} ${parseFloat(data.getPrice()).toFixed(2)}`}</Typography>
                </div>
                <button data-testid={`button-addCart-${data.getName()}`} onClick={onHandleClick} className="buttonAddCart"> ADD TO CART </button>
            </Grid>
        </Grid>
    )
}

export default ProductTile;