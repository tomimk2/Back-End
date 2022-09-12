//  IMPORTS  //

// CSS
import './ItemCount.css';

// Material UI
import Button from '@mui/material/Button';

// React
import {useState} from 'react';


//  COMPONENT   //
const ItemCount = ({stock, onAdd}) => {

    // State del contador
    const [counter, setCounter] = useState(1)


    // Funciones para restar y sumar un producto
    const substract = (e) => {
        e.stopPropagation();
        if (counter > 1) {
            setCounter(counter - 1)
        };
    };

    const add = (e) => {
        e.stopPropagation();
        if (counter < stock) {
            setCounter(counter + 1)
        };
    };


    //  HTML  //
    return(
        <div className='container-itemCount'>
            <div className='row-itemCount'>
                <div>
                    <Button variant="outlined" size="small" className='btn-itemCount' onClick={(e) => substract(e)}>-</Button>
                </div>
                <div className='number-itemCount'>
                    <p counter={counter}>{counter}</p>
                </div>
                <div>
                    <Button variant="outlined" size="small" className='btn-itemCount' onClick={(e) => add(e)}>+</Button>
                </div>
            </div>
            <div className='row-itemCount'>
                <div className='col-itemCount'>
                    <Button variant="contained" id='btnBuy-itemCount' onClick={(e) => onAdd(e, counter)}>Agregar al carrito</Button>
                </div>
            </div>
        </div>
    )
};

export default ItemCount;