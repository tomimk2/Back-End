// Import del CSS
import './Pages.css';

// Import de react-router-dom
import { useParams } from "react-router-dom";

// Import del componente
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer";

const Producto = () => {
    
    // Creación del id a través del useParams, para pasarlo como prop
    const id = useParams().id;

    return(
        <main>
            <ItemDetailContainer id={id}/>
        </main>
    )
}

export default Producto;