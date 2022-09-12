// Imports de React
import {createContext, useState, useEffect } from "react";

// Creación del context
const CartContext = createContext();


//  CONTEXT   //
const CartProvider = ({children}) => {
    // Estados de carrito y valor total de los productos
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("carrito")) || []);
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(0)


    //  FUNCTIONS   //

    // Función para añadir productos al carrito
    const addProductToCart = (product) => {
        setIsCartEmpty(false)
        let productExists = cartProducts.find((cartProduct) => {
            if ((cartProduct.id === product.id) && (cartProduct.color === product.color) && (cartProduct.talle === product.talle)) {
                return product
            }
        });

        if (!productExists) {
            setCartProducts(cartProducts => [...cartProducts, product]);
            localStorage.setItem("carrito", JSON.stringify([...cartProducts, product]))
            setAmount(amount + product.cantidad)
            setTotal(total + product.precioTotal)
        }
        
    };

    // Función para eliminar un producto del carrito
    const removeProductFromCart = (e, product) => {
        e.stopPropagation()
        const productsFinal = cartProducts.filter((p) => {
            setTotal(total - product.precioTotal)
            setAmount(amount - product.cantidad)
            return p !== product
        });
        setCartProducts(productsFinal);
        localStorage.setItem("carrito", JSON.stringify(productsFinal))

        if (cartProducts.length-1 === 0) {
            localStorage.removeItem("carrito")
            setIsCartEmpty(true)
            setAmount(0)
            setTotal(0)
        }
    };

    // Función para vaciar el carrito
    const emptyCart = (e) => {
        e.stopPropagation()
        setCartProducts([]);
        setIsCartEmpty(true)
        setTotal(0)
        setAmount(0)
        localStorage.removeItem("carrito")
    };
    
    // Función para chequear si existe un carrito
    const checkCart = () => {
        if (cartProducts.length !== 0) {
            setIsCartEmpty(false)
            let valor = 0;
            let cantidad = 0
            cartProducts.map(p => {
                valor += p.precioTotal;
                cantidad += p.cantidad
            })
            setTotal(valor)
            setAmount(cantidad)
        }
    };


    // UseEffect para llamar a la función
    useEffect(() => {
        checkCart()
    }, [])
 

    // Data para enviar a los children
    const data = {
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        emptyCart,
        isCartEmpty,
        setTotal,
        total,
        setAmount,
        amount
    }
    
    
    
    return (
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
};

export {CartProvider};
export default CartContext;