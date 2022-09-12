// Imports de React
import { createContext, useState } from "react";

// Imports de la base de datos y firestore
import db from '../firebase';
import { collection, getDocs, addDoc} from "firebase/firestore";


// Creación del context
const OrderContext = createContext();


//  CONTEXT   //  
const OrderProvider = ({children}) => {

    // Estados para setear las ordenes
    const [order, setOrder] = useState({});
    const [ordersDb, setOrdersDb] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState();
    const [ordersByUserId, setOrdersByUserId] = useState([]);


    //  FUNCTIONS   //

    // Función para traer todas las órdenes
    // const getOrders = async () => {
    //     const ordersCollection = collection(db, "orders");
    //     const ordersSnapshot = await getDocs(ordersCollection);
    //     const ordersList = ordersSnapshot.docs.map(list => {
    //         let orden = list.data();
    //         orden.id = list.id;
    //         return orden
    //     })
    //     return setOrdersDb(ordersList)
    // }

    // Función para traer todas las órdenes de un mismo usuario
    const getOrderByUserId = (id) => {
        fetch(`/cart/${id}/productos`)
            .then(res => res.json())
            .then(data => setOrdersByUserId(data))
    }; 

    // Función para crear una orden nueva
    const createOrder = async (objOrder) => {
        fetch('/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(objOrder)
        })
            .then(res => res.json())
            .then(data => setOrder(data))
        setOrderSuccess(true)
    }


    // Data para enviar a los children
    const data = {
        // getOrders, 
        getOrderByUserId,
        setOrdersByUserId,
        ordersByUserId,
        createOrder,
        order,
        setOrder,
        ordersDb,
        orderSuccess,
        setOrderSuccess
    }

    return (
        <OrderContext.Provider value={data}>
            {children}
        </OrderContext.Provider>
    )
};

export {OrderProvider};
export default OrderContext;