// Import del CSS
import './Pages.css';

// Import del componente
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

const Productos = () => {
    return(
        <main>
            <ItemListContainer cat_id={null}/>
        </main>
    )
}

export default Productos;