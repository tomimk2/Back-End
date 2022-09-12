//  IMPORTS  //

// CSS
import './Item.css';

// Material UI
import { Card, CardActions, CardContent, CardMedia, Button, FormControl, Radio, Select, MenuItem, InputLabel, Alert, Snackbar, Backdrop, Tooltip } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { pink, green, brown, grey, orange, red, yellow, lightBlue, teal} from '@mui/material/colors';

// React
import {useContext, useState} from 'react'

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Context
import CartContext from '../../../../context/CartContext';
import LogInContext from '../../../../context/LogInContext';

// Component
import ItemCount from './ItemCount/ItemCount';

//  COMPONENT  //
const Item = ({props}) => {

  // Llamada a contexto
  const {addProductToCart} = useContext(CartContext)
  const {loggedIn} = useContext(LogInContext);

  // Instancia de useNavigate
  const navigate = useNavigate();


  //  STATES  //

  // Estados para manejar las props que recibe el componente
  const imagen = props.imagen || [];
  const color = props.color || [];
  const talle = props.talle || [];
  const imagenAlt = props.imagenAlt || [];
  const {id, categoria, id_categoria, nombre, precio, stock} = props;

  // Estados para manejar los select, los menúes y los carrouseles de imágenes
  const [positionCarousel, setPositionCarousel] = useState(0);
  const [colour, setColour] = useState('');
  const [size, setSize] = useState('');
  const [imgResultante, setImgResultante] = useState("");
  const [altImgResultante, setAltImgResultante] = useState("");
  const [selectedProperties, setSelectedProperties] = useState(true);
  const [open, setOpen] = useState(false);
  const [loggedOpen, setLoggedOpen] = useState(false);


  //  FUNCTIONS  //

  // Funciones para abrir y cerrar los snackbar
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
  const handleSizeChange = (e) => {
    e.stopPropagation()
    setSize(e.target.value);
  }

  const handleColorChange = (e) => {
    e.stopPropagation();
    setColour(e.target.value);
    let indexImg = parseInt(e.target.id);
    setImgResultante(imagen[indexImg])
    setAltImgResultante(imagenAlt[indexImg])
  };

  const controlProps = (selectedColor) => ({
    checked: colour === selectedColor,
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


  // Funciones para mover las imágenes de los carrouseles
  const moveLeft = (e) => {
    e.stopPropagation()
    if (positionCarousel < 0) {
      setPositionCarousel(positionCarousel + 315);
    }  
  };

  const moveRight = (e) => {
    e.stopPropagation()
    if (positionCarousel > -(315*(imagen.length-1))) {
        setPositionCarousel(positionCarousel - 315);
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
      }
    }
  };


  // Enrutamiento de botón
  const navigateToDetail = () => {
    navigate(`/products/${id}`);
  };


  //  HTML  //
  return (
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
          <Snackbar open={open} onClose={handleSnackbarClose} autoHideDuration={6000} id="snackbar-item">
            <Alert onClose={handleSnackbarClose} severity="error" id="alert-item">
              Tenés que elegir talle y color del producto para agregarlo al carrito.
            </Alert>
          </Snackbar>
        </Backdrop>
        
      )}

      <div>
        <Card id="card-item">
          <div className='rowBtn-item'>
              <Button onClick={(e) => moveLeft(e)} id='btnMoveImg-item'><ChevronLeftRoundedIcon id='btnArrow-item'/></Button> 
              <Button onClick={(e) => moveRight(e)} id='btnMoveImg-item'><ChevronRightRoundedIcon id='btnArrow-item'/></Button> 
          </div>
          <div className='imgDiv-item' onClick={navigateToDetail}>
            <div className='imgAnimation-item' style={style}>          
              {imagen.map((img, i) => {
                return (
                  <CardMedia
                  component="img"
                  alt={imagenAlt[i]}
                  image={img}
                  id="img-item"
                  key={img}
                  />
                )
              })}
            </div> 
          </div>
          <CardContent id='cardContent-item'>
              <div>
                  <h1 className='title-item' onClick={navigateToDetail}>{nombre}</h1>
              </div>
              <div>
                  <h2 className='price-item'>${precio}</h2>
              </div>
              <div className='row-item' id="selectColor-item">
                {color.map((c, i) => {
                  return(
                      <div className="col-item" key={c}>
                        <Tooltip title={c}>
                          <Radio {...controlProps(c)}
                          className="itemSelect-item" sx={{color: radioColor(c),
                          '&.Mui-checked': {color: radioColor(c)}}}
                          onClick={(e) => handleColorChange(e)}  id={i.toString()}/>
                        </Tooltip>
                      </div>
                      )
                  })
                }
              </div>
              <div className='row-item'>
                <FormControl id="selectSize-item">
                  <InputLabel id="demo-simple-select-label">Talle</InputLabel>
                  <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={size}
                  onChange={(e) => handleSizeChange(e)}

                  >
                    {talle.map(t => {
                        return( 
                            <MenuItem value={t} key={t} onClick={(e) => {handleSizeChange(e)}}>{t}</MenuItem>       
                            )
                        })
                    }
                  </Select>
                </FormControl>
              </div> 
          </CardContent>
          <CardActions className='btn-item'>
            <ItemCount stock={stock} onAdd={onAdd}/>
          </CardActions>
        </Card>
      </div>
    </>
    
  );
};

export default Item;