//  IMPORTS  //

// CSS
import './ItemListContainer.css';

// React
import { useEffect, useContext } from 'react';

// Contect
import CategoriesContext from '../../context/CategoriesContext';

// Components
import ItemList from './ItemList/ItemList';
import ButtonBar from '../ButtonBar/ButtonBar';


//  COMPONENT  //
const ItemListContainer = ({cat_id}) => {

    // Llamada a contexto
    const {getCategories, categories, category, setCat} = useContext(CategoriesContext);


    // UseEffect para llamar a las categorías y establecer la categoría correspondiente
    useEffect(() => {
        getCategories();
        setCat(cat_id, categories);
    }, []);

    useEffect(() => {
        setCat(cat_id, categories)
    }, [cat_id]);


    //  HTML  //
    return(
        <div className="container-itemListContainer">
            <ButtonBar category={category} categories={categories}/>
            <ItemList id_cat={cat_id}/>
        </div>  
    );
};

export default ItemListContainer;