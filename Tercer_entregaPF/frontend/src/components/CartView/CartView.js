//  IMPORTS  //

// CSS
import './CartView.css';

// Material UI
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

// React
import { useContext } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Context
import CartContext from '../../context/CartContext';


//  Component  //
const CartView = () => {
    
    // Llamada a contexto
    const {cartProducts, removeProductFromCart, emptyCart, isCartEmpty, total} = useContext(CartContext);

    // Instancia useNavigate
    const navigate = useNavigate();   

    // Theme Material UI
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    }));


    //  FUNCTIONS  //

    // Enrutamiento de botones
    const goBack = () => {
        navigate('/products');
        window.scrollTo(0,0);
    }

    const buy = () => {
        navigate('/purchase');
        window.scrollTo(0,0);
    }

    
    //  HTML  //
    return (
        <>
            {!isCartEmpty ? (
                <div className='container-cartView'>
                    <div className='row-cartView'>
                        <Button onClick={goBack} id='btnVolver-cartView'><ArrowLeftIcon/> Seguir comprando</Button>
                        <Button color='error' variant='contained' onClick={(e) => emptyCart(e)}>Vaciar carrito</Button>
                    </div>
                    <TableContainer id="tContainer-cart">
                        <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-cart">
                            <TableHead id="tHead-cart">
                                <TableRow className='tCell-cart'>
                                    <TableCell align="center">Producto</TableCell>
                                    <TableCell align="center">Color</TableCell>
                                    <TableCell align="center">Talle</TableCell>
                                    <TableCell align="center">Cantidad</TableCell>
                                    <TableCell align="center">Precio unitario</TableCell>
                                    <TableCell align="center">Precio final</TableCell>
                                    <TableCell align="center"> - </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody id="tBody-cart">
                                {cartProducts.map((p) => (
                                    <StyledTableRow key={`row-${p.id}-color${p.color}-talle-${p.talle}`} align="center">
                                        <TableCell component="th" scope="row" key={`nombre-${p.id}`} align="center">{p.nombre}</TableCell>
                                        <TableCell component="th" scope="row" key={`color-${p.id}`} align="center">{p.color}</TableCell>
                                        <TableCell component="th" scope="row" key={`talle-${p.id}`} align="center">{p.talle}</TableCell>
                                        <TableCell component="th" scope="row" key={`cantidad-${p.id}`} align="center">{p.cantidad}</TableCell>
                                        <TableCell component="th" scope="row" key={`precioU-${p.id}`} align="center">{`$${p.precioUnitario}`}</TableCell>
                                        <TableCell component="th" scope="row" key={`precioT-${p.id}`} align="center">{`$${p.precioTotal}`}</TableCell>
                                        <TableCell component="th" scope="row" key={`delete-${p.id}`} align="center"><Button color='error' onClick={(e) => removeProductFromCart(e, p)}><DeleteIcon/></Button></TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            <TableFooter id="tFooter-cart">
                                <TableRow>
                                    <TableCell className='tCell-cart' align="center">TOTAL</TableCell>
                                    <TableCell align="center">-</TableCell>
                                    <TableCell align="center">-</TableCell>
                                    <TableCell align="center">-</TableCell>
                                    <TableCell align="center">-</TableCell>
                                    <TableCell align="center">-</TableCell>
                                    <TableCell className='tCell-cart' align="center">{`$${total}`}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    <div className='row-cartView justify-center mt'>
                        <Button onClick={buy} id='btnComprar-cartView'>Finalizar compra</Button>
                    </div>
                </div>
            ):(
                <div className='container-cartView'>
                    <div className='row-cartView justify-center'>
                        <div>
                            <h3 className='h3-cartView'>¡No tenés productos en el carrito para efectuar una compra!</h3>
                            <Button variant='contained' id="btnSeguirComprando-cartView" onClick={goBack}>Seguí comprando</Button>
                        </div>
                    </div>
                </div>
            )

            }
        </> 
    )
}

export default CartView;
  
