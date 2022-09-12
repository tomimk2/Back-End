//  IMPORTS  //

// CSS
import './PurchaseView.css';

// Material UI
import { Button } from '@mui/material';

// React
import { useContext, useEffect } from "react";

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Logo MercadoPago
import logoMP from '../../images/logo-mercadopago.png';

// Context
import CartContext from "../../context/CartContext";
import LogInContext from '../../context/LogInContext';
import OrderContext from '../../context/OrderContext';

const Purchase = () => {

    // Llamada a context
    const {cartProducts, total, isCartEmpty, emptyCart} = useContext(CartContext);
    const {user} = useContext(LogInContext);
    const {createOrder, order, setOrder, orderSuccess, setOrderSuccess, getOrderByUserId} = useContext(OrderContext);

    // Instancia de useNavigate
    const navigate = useNavigate();


    // Función para crear la compra
    const purchase = (e) => {
        e.preventDefault();
        let objOrder = {
            ...order,
            comprador: user
        }
        createOrder(objOrder);
    };

    // Función de enrutamiento para volver a la sección de productos
    const goBack = () => {
        navigate('/products');
        setOrderSuccess();
    }

    // Función de enrutamiento para volver a la sección de productos
    const goOn = (e) => {
        emptyCart(e)
        navigate('/products');
        setOrderSuccess(); 
    }


    // UseEffect para setear la orden cuando se modifican los productos del carrito
    useEffect(() => {
        setOrder({
            comprador: user,
            productos: cartProducts.map(p => {
                return {
                    id: p.id,
                    nombre: p.nombre,
                    talle: p.talle,
                    color: p.color,
                    cantidad: p.cantidad,
                    precio: p.precioUnitario,
                    precioTotal: p.precioTotal
                }
            }),
            precioFinal: total,
            fecha: new Date().toLocaleString('es-AR')
        });
    }, [cartProducts]);

    useEffect(() => {
        getOrderByUserId(user.id);
    }, [orderSuccess])


    //  HTML   //
    return (
        <>
            {orderSuccess ? (
                    <div className="container-purchase">
                        <div className="row-purchase">
                            <h3 className="title-purchase">¡Tu compra se generó correctamente!</h3>
                        </div>
                        <div className="row-purchase">
                            <div className="col-purchase">
                                <Button id="btnSeguirComprando-purchaseView" onClick={(e) => goOn(e)}>Seguí comprando</Button>
                            </div>
                        </div>  
                    </div>
                ) : (
                    <>
                        {isCartEmpty ? (
                            <div className='container-purchase'>
                                <div className="row-purchase">
                                    <h3 className="title-purchase">¡No tenés productos en el carrito para efectuar una compra!</h3>
                                </div>
                                <div className="row-purchase">
                                    <div className="col-purchase">
                                        <Button id="btnSeguirComprando-purchaseView" onClick={goBack}>Seguí comprando</Button>
                                    </div>
                                </div> 
                            </div>
                        ) : (
                            <div className='container-purchase'>
                                <div className="row-purchase">
                                    <h3 className="title-purchase" id='fontMP-purchase'>Para terminar, confirmá tu pago</h3>
                                </div>
                                <div className="row-purchase borderMP-purchase">
                                    <div className="col-purchase justifyCenter bg-grey p-5">
                                        <img src={logoMP} alt='Logo MercadoPago' className='imgMP-purchase'/>
                                    </div>
                                    <div className="col-purchase m-5">
                                        <div className='row-purchase justifyStart'>
                                            <h4 id='fontMP-purchase'>Detalles de tu compra</h4>
                                        </div>
                                                {
                                                    cartProducts.map(p => {
                                                        return(
                                                            <div className="row-purchase justifyBetween" key={`${p.id}-${p.cantidad}`}>
                                                                <div className='mb'>
                                                                    <p id='fontMP-purchase'>{p.cantidad} {p.nombre}</p>
                                                                </div>
                                                                <div className='mb'>
                                                                    <p id='fontMP-purchase'>${p.precioTotal}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                        <div className="row-purchase">
                                            <div className='divider-purchase'></div>
                                        </div>
                                        <div className="row-purchase justifyBetween">
                                            <div id='total-purchase'>
                                                <p id='fontMP-purchase'>Pagás</p>
                                            </div>
                                            <div id='total-purchase'>
                                                <p id='fontMP-purchase'>${total}</p>
                                            </div>
                                        </div>
                                        <div className="row-purchase">
                                            <Button id='btnMP-purchase' onClick={purchase}>Pagar</Button>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        )}
                    </>
                )
            }
        </>
    )
}


export default Purchase;