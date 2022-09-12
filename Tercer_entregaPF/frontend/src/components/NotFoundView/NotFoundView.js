//  IMPORTS  //

// CSS
import './NotFoundView.css';

// Material UI
import { Button } from "@mui/material";

// react-router-dom
import { useNavigate } from "react-router-dom";


//  COMPONENT   //
const NotFound = () => {

    // Instancia de useNavigate
    const navigate = useNavigate();

    // Función de enrutamiento para volver a la home
    const navigateHome = () => {
        navigate('/')
    }

    //  HTML   //
    return (
        <div className="container-notFound">
            <div className="row-notFound">
                <h2 className="title-notFound">.404</h2>
            </div>
            <div className="row-notFound">
                <h3 className="subtitle-notFound">No encontramos la página que estás buscando</h3>
            </div>
            <div className="row-notFound">
                <Button id='btn-notFound' onClick={navigateHome}>Volvé al inicio</Button>
            </div>
        </div>
    )
}

export default NotFound;