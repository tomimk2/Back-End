//  IMPORTS  //

// CSS
import './ItemList.css';

// React
import { useState, useEffect } from 'react';

// Database & Firestore
import db from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Component
import Item from './Item/Item';


//  COMPONENT  //
const ItemList = ({id_cat}) => {
    
    // States de productos y categorías
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(false);


    // UseEffect para llamar a la función
    useEffect(() => {
        fetch("/products")
            .then(res => res.json())
            .then(products => setProducts(products))
    }, []);

    useEffect(() => {
        if (id_cat !== null) {
            setCategory(true)
        } else  {
            setCategory(false)
        };
    }, [id_cat]);


    //  HTML  //
    return(
        <div className="row-itemList">
            {
                category ? (
                    products.filter(product => product.id_categoria === id_cat).map(pFiltrado => {        
                        return(
                            <div className="col-itemList" key = {pFiltrado.id}>
                                <Item
                                    props = {pFiltrado}
                                />
                            </div>
                        )
                    })
                ) :
                    products.map(product => {        
                        return(
                            <div className="col-itemList" key = {product.id}>
                                <Item
                                    props = {product}
                                />
                            </div>
                        )
                    })
            }
            
        </div>
    );
};

export default ItemList;