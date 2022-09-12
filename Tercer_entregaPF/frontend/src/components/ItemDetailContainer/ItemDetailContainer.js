//  IMPORTS  //

// CSS
import './ItemDetailContainer.css';

// React
import { useState, useEffect, useContext } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Database & Firestore
import { doc, getDoc } from "firebase/firestore";
import db from '../../firebase';

// Componentes
import ItemDetail from './ItemDetail/ItemDetail';
import ButtonBar from '../ButtonBar/ButtonBar';

// Context
import CategoriesContext from '../../context/CategoriesContext';


//  Component  //
const ItemDetailContainer = ({id}) => {

    // Llamada a contexto
    const {getCategories, categories, setCat} = useContext(CategoriesContext);

    // States
    const [product, setProduct] = useState({});

    // Instancia de useNavigate
    const navigate = useNavigate();


    // UseEffect para llamar a los productos por categoría de la base de datos
    useEffect(() => {  
        getCategories()  
        setCat(id, categories) 
    }, []);

    useEffect(() => {
        getProduct()
        setCat(id, categories)
    }, [id]);


    // Función para llamar a los productos
    const getProduct = async () => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let producto = docSnap.data();
            producto.id = docSnap.id;
            return setProduct(producto)
        } else {
            navigate('/error')
        }
    };


    //  HTML  //
    return(
        <div className="container-itemDetailContainer">
            <ButtonBar category={product.categoria} categories={categories}/>
            <div className='row-itemDetailContainer'>
                <ItemDetail props={product}/>
            </div>
        </div>
    );
};

export default ItemDetailContainer;