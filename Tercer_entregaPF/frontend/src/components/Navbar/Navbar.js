//  IMPORTS  //

// CSS
import './Navbar.css';

// Material UI
import { Button, Divider, Menu, MenuItem, AppBar, Box, Toolbar } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// React
import {useState, useContext, useEffect} from 'react';

// react-router-dom
import { Link, useNavigate } from 'react-router-dom';

// Context
import CartContext from '../../context/CartContext';
import LogInContext from '../../context/LogInContext';
import OrderContext from '../../context/OrderContext';

// Components
import CartWidget from './CartWidget/CartWidget';
import UserWidget from './UserWidget/UserWidget';

// Logo tienda
import logoMecha from '../../images/logo.png'


//  COMPONENT   //
const Navbar = () => {

    // Llamada a contexts
    const {isCartEmpty} = useContext(CartContext);
    const {loggedIn, getUsers, checkLogIn, user} = useContext(LogInContext);
    const {getOrders} = useContext(OrderContext);

    // Instancia de useNavigate
    const navigate = useNavigate();
    
    // States para abrir y cerrar menú
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    // Funciones para abrir y cerrar menú
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Función de enrutamiento de botón
    const navigateHome = () => {
        navigate('/');
    }; 

    // Array de categorías
    const categorias = [
        {
            id_categoria: 1,
            categoria: "Botas"
        },
        {
            id_categoria: 2,
            categoria: "Ojotas"
        },
        {
            id_categoria: 3,
            categoria: "Sandalias"
        },
        {
            id_categoria: 4,
            categoria: "Zapatillas"
        },
    ];

    
    // UseEffect para llamar al usuario y sus compras efectuadas
    // useEffect(() => {
    //     getUsers();
    //     checkLogIn();
    //     getOrders();
    // }, [])

    // useEffect(() => {
    //     getOrders();
    // }, [user, loggedIn])


    //  HTML   //
    return (
        <header>
            <Box className='box-navbar'>
                <AppBar position="fixed">
                    <Toolbar className='navbar'>
                        <div className='logoMecha-navbar'>
                            <img src={logoMecha} className="logo-navbar" alt='Logo Mecha Calzados' onClick={navigateHome}/>
                        </div>
                        <div className='links-navbar'>
                            <ul id='ul-navbar'>
                                <li>
                                    <Button id='btnHome-navbar'>
                                        <Link to={"/"} id='linkHome-navbar'>Home</Link>
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                    id="btnProductos-navbar"
                                    aria-controls={open ? 'btnProductos-navbar' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    >
                                    <div id='linkProductos-navbar'>Productos</div>
                                    </Button>
                                    <Menu
                                    id="menuProductos-navbar"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'menuProductos-navbar'
                                    }}
                                    className="menuProductos-navbar"
                                    >
                                        {
                                            categorias.map(c => {
                                                return (
                                                    <MenuItem onClick={handleClose} key={c.id_categoria}>
                                                        <Link to={`/categories/${c.id_categoria}`} id='linkCat-navbar'><ArrowRightIcon className='flechaProductos-navbar'/>{c.categoria}</Link>
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                        <Divider></Divider>
                                        <MenuItem onClick={handleClose} className="liProductos-navbar">
                                            <Link to="/products" id='linkAll-navbar'>Ver todos</Link>
                                        </MenuItem>
                                    </Menu>
                                </li>
                                <li>
                                    <Button id='btnUs-navbar'>
                                        <Link to={"/us"} id='linkUs-navbar'>Nosotros</Link>
                                    </Button>
                                </li>
                                <li>
                                    <Button id='btnContact-navbar'>
                                        <Link to={"/contact"} id='linkContact-navbar'>Contacto</Link>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                        <div className='logosCart-navbar'>
                            {
                                (!isCartEmpty && loggedIn) && 
                                    <div className='logosUserCart-navbar'>
                                        <CartWidget/>
                                    </div>
                            }
            
                            <div className='logosUserCart-navbar'>
                                <UserWidget/>
                            </div>
                        </div> 
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
};

export default Navbar;
