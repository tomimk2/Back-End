// Import del CSS
import './Pages.css';

// Import de react-router-dom
import { useParams } from "react-router-dom";

// Import del componente
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

const Categoria = () => {

    // Creación del id a través del useParams, para pasarlo como prop
    const id = parseInt(useParams().id)

    return(
        <main>
            <ItemListContainer cat_id={id}/>
        </main>
    )
};

export default Categoria;