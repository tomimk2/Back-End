//  IMPORTS  //

// CSS
import './ItemDetail.css';

// Material UI
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Button, Backdrop, Snackbar, Alert, MenuItem, FormControl, Select, Radio, Tooltip } from '@mui/material';
import { pink, green, brown, grey, orange, red, yellow, lightBlue, teal} from '@mui/material/colors';

// React
import {useContext, useState} from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Context
import CartContext from '../../../context/CartContext';
import LogInContext from '../../../context/LogInContext';

// Component
import ItemCount from '../../ItemListContainer/ItemList/Item/ItemCount/ItemCount'


//  COMPONENT  //
const ItemDetail = ({props}) => {

    // Llamada a contexto
    const {addProductToCart} = useContext(CartContext);
    const {loggedIn} = useContext(LogInContext);

    // Instancia de useNavigate
    const navigate = useNavigate();


    //  STATES  //

    // Estados para manejar las props que recibe el componente
    const imagen = props.imagen || [];
    const color = props.color || [];
    const talle = props.talle || [];
    const imagenAlt = props.imagenAlt || [];
    const {id, nombre, id_categoria, categoria, precio, stock} = props;

    // Estados para manejar los select, los menúes y el carrousel de imágenes
    const [colour, setColour] = useState('');
    const [size, setSize] = useState("");
    const [imgResultante, setImgResultante] = useState("");
    const [altImgResultante, setAltImgResultante] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [positionCarousel, setPositionCarousel] = useState(0);
    const [imgDimensions, setImgDimensions] = useState({height:0, width:0});
    const [selectedProperties, setSelectedProperties] = useState(true);
    const [open, setOpen] = useState(false);
    const [loggedOpen, setLoggedOpen] = useState(false);


    //  FUNCTIONS  //

    // Funciones para abrir y cerrar los snackbars
    const handleSnackbarOpen = () => {
        setOpen(true);
        const body = document.querySelector("body")
        body.setAttribute("id", "o-hidden")
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        const body = document.querySelector("body")
        body.removeAttribute("id", "o-hidden")
        setOpen(false);
    };

    const handleSnackbarLoggedOpen = () => {
        setLoggedOpen(true);
        const body = document.querySelector("body")
        body.setAttribute("id", "o-hidden")
    };
    const handleSnackbarLoggedClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        const body = document.querySelector("body")
        body.removeAttribute("id", "o-hidden")
        setLoggedOpen(false);
    };


    // Funciones para modificar las selecciones de talle y color del usuario
    const handleSizeChange = (event) => {
        setSize(event.target.value)
    }

    const handleColorChange = (event) => {
        setColour(event.target.value);
        let indexImg = parseInt(event.target.id);
        setImgResultante(imagen[indexImg])
        setAltImgResultante(imagenAlt[indexImg])
    };

    const controlProps = (selectedColor) => ({
        checked: colour === selectedColor,
        onChange: handleColorChange,
        value: selectedColor,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': selectedColor }
    });


    // Colores para el radio button
    const radioColor = (color) => {
        switch (color) {
            case "Amarillo":
                return yellow[500]
                break;
        
            case "Anaranjado":
                return orange[500]
                break;

            case "Blanco":
                return grey[300]
                break;
        
            case "Camel":
                return orange[300]
                break;

            case "Camuflado":
                return green[900]
                break;
        
            case "Celeste":
                return lightBlue[400]
                break;

            case "Gris":
                return grey[600]
                break;
        
            case "Marrón":
                return brown[800]
                break;

            case "Negro":
                return grey[900]
                break;
        
            case "Nude":
                return red[200]
                break;

            case "Rojo":
                return red[400]
                break;
        
            case "Rosa":
                return pink[200]
                break;

            case "Suela":
                return brown[400]
                break;
        
            case "Verde":
                return teal[400]
                break;

            default:
                break;
        }
    }

    // Funciones para establecer el tamaño de la imagen, crear parte del carrousel y utilizar las flechas para cambiar de imagen
    const onImgLoad = ({ target: img }) => {
        const { offsetHeight, offsetWidth } = img;
        setImgDimensions({height:offsetHeight, width:offsetWidth});
    };

    const moveLeft = () => {
        if (positionCarousel < 0) {
            setPositionCarousel(positionCarousel + imgDimensions.width);
        }  
    };

    const moveRight = () => {
        if (positionCarousel > -(imgDimensions.width*(imagen.length-1))) {
            setPositionCarousel(positionCarousel - imgDimensions.width);
        } 
    };

    const style = {"transform": `translateX(${positionCarousel}px)`};


    // Función para añadir producto al carrito
    const onAdd = (e, counter) => {
        e.stopPropagation();
        if (!loggedIn) {
            handleSnackbarLoggedOpen()
        } else {
            if ((colour !== '') && (size !== '')) {
                if (counter <= stock) {
                    setQuantity(true);
                    const producto = {
                        id: id,
                        nombre: nombre,
                        color: colour,
                        talle: size,
                        id_categoria: id_categoria,
                        categoria: categoria,
                        imagen: imgResultante,
                        imagenAlt: altImgResultante,
                        stock: stock,
                        precioUnitario: precio,
                        precioTotal:  precio*counter,
                        cantidad: counter 
                    }

                    addProductToCart(producto);
                    setSelectedProperties(true)
                };
            } else {
                setSelectedProperties(false);
                handleSnackbarOpen()
            };
        };
    };


    // Enrutamiento de botón
    const endPurchase = () => {
        navigate('/cart');
    }
    

    //  HTML  //
    return(
        <>
            {!loggedIn && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loggedOpen}
                    onClick={handleSnackbarLoggedClose}>
                    <Snackbar open={loggedOpen} onClose={handleSnackbarLoggedClose} autoHideDuration={6000} id="snackbar-item">
                        <Alert onClose={handleSnackbarLoggedClose} severity="error" id="alert-item">
                            Tenés que ingresar a tu cuenta para comprar.
                        </Alert>
                    </Snackbar>
                </Backdrop>
            )}

            {!selectedProperties && (
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleSnackbarClose}>
                <Snackbar open={open} onClose={handleSnackbarClose} autoHideDuration={6000} id="snackbar-itemDetail">
                    <Alert onClose={handleSnackbarClose} severity="error" id="alert-itemDetail">
                    Tenés que elegir talle y color del producto para agregarlo al carrito.
                    </Alert>
                </Snackbar>
                </Backdrop>
            )}

            <div className="container-itemDetail">
                <div className='containerBtn-itemDetail'>
                    <div className='rowBtn-itemDetail' style={{top: imgDimensions.height/2}}>
                        <Button onClick={moveLeft} id='btnMoveImg-itemDetail' color="secondary"><ChevronLeftRoundedIcon id='btnArrow-itemDetail'/></Button> 
                        <Button onClick={moveRight} id='btnMoveImg-itemDetail' color="secondary"><ChevronRightRoundedIcon id='btnArrow-itemDetail'/></Button> 
                    </div>
                </div>
                <div className="row-itemDetail space-between">
                    <div className="col-itemDetail w-60">
                        <div className='imgDiv-itemDetail' style={{height:imgDimensions.height}}>
                            <div className='imgAnimation-itemDetail' style={style}>
                                {imagen.map((img, i) => {
                                    return (
                                        <img
                                        onLoad={onImgLoad}
                                        alt={imagenAlt[i]}
                                        src={`../../..${img}`}
                                        className="img-itemDetail"
                                        key={img}
                                        />
                                    )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-itemDetail w-30 flex-start">
                        <div className="row-itemDetail">
                            <h1 className='title-itemDetail'>{nombre}</h1>
                        </div>
                        <div className="row-itemDetail">
                            <p className='price-itemDetail'>${precio}</p>
                        </div>
                        <div className="row-itemDetail">
                            <div className="col-itemDetail w-100">
                                <p className='subtitle-itemDetail'>Color</p>
                                <div className='row-itemDetail'>
                                    {color.map((c, i) => {
                                        return(
                                            <div className="col-itemDetail" key={c}>
                                                <Tooltip title={c}>
                                                    <Radio {...controlProps(c)}
                                                    className="itemSelect-itemDetail" sx={{color: radioColor(c),
                                                    '&.Mui-checked': {color: radioColor(c)}}} id={i.toString()}/>
                                                </Tooltip>
                                            </div>
                                            )
                                        })
                                    }
                                </div>
                                <p className='subtitle-itemDetail'>Talle</p>
                                <div className='row-itemDetail'>
                                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                                        <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={size}
                                        onChange={handleSizeChange}
                                        autoWidth
                                        >
                                            {talle.map(t => {
                                                return( 
                                                    <MenuItem value={t} key={t}>{t}</MenuItem>       
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>   
                                <div className="row-itemDetail">
                                    <p className='subtitle-itemDetail'>Detalle</p>
                                    <p className='description-itemDetail'>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos reiciendis doloremque dolorum et odio voluptatibus fugit nisi qui consectetur minus ad corrupti pariatur, possimus iure quis aperiam, rem, ipsa iusto?
                                    </p>
                                </div>   
                                <div className="btn-itemDetail">
                                    {quantity === 0 ? (
                                        <ItemCount stock={stock} onAdd={onAdd}/>  
                                    ) : (
                                        <>
                                            <ItemCount stock={stock} onAdd={onAdd}/>
                                            <div className="container-itemDetail m-0">
                                                <div className='rowBtn-itemDetail w-100'>
                                                    <Button id='btnBuy-itemDetail' onClick={endPurchase} size='small'>Comprar</Button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </> 
    );  
};

export default ItemDetail;