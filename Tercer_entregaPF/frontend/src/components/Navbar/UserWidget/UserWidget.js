//  IMPORTS  //

// CSS
import './UserWidget.css';

// Material UI
import { IconButton, Menu, MenuItem, TextField, FormControl, InputLabel, Input, InputAdornment, Button, Divider, Backdrop, Snackbar, Alert, ListItemIcon, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Logout from '@mui/icons-material/Logout';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// React
import { useState, useContext } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Context
import LogInContext from '../../../context/LogInContext';
import OrderContext from '../../../context/OrderContext';
import CartContext from '../../../context/CartContext';


//  COMPONENT  //
const UserWidget = () => {

    // Llamada a context
    const {logIn, logOut, loggedIn, setUser, user, getUserById, setInitialAvatar, initialAvatar} = useContext(LogInContext);
    const {getOrderByUserId} = useContext(OrderContext)
    const {emptyCart} = useContext(CartContext)

    // Instancia de useNavigate
    const navigate = useNavigate();

    // Estados para abrir y cerrar menús, mostrar y ocultar la contraseña y setear al usuario
    const [anchorElAccount, setAnchorElAccount] = useState(null);
    const openAccount = Boolean(anchorElAccount);
    const [showPassword, setShowPassword] = useState(false)
    const [usuario, setUsuario] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);


    //  FUNCTIONS  //

    // Funciones para abrir y cerrar el menú
    const handleClickAccount = (event) => {
        setAnchorElAccount(event.currentTarget);
    };

    const handleCloseAccount = (e) => {
        e.preventDefault()
        setAnchorElAccount(null);
    };

    // Funciones para abrir y cerrar el snackbar
    const handleSnackbarOpen = () => {
        setOpenSnackbar(true);
        const body = document.querySelector("body")
        body.setAttribute("id", "o-hidden")
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        const body = document.querySelector("body");
        body.removeAttribute("id", "o-hidden");
        setOpenSnackbar(false);
    };
    
    // Función para setear el usuario a partir de los valores ingresados en el form
    const navigateLogin = (event) => {
        event.preventDefault();
        navigate('/login');
    };

    // Funciones para mostrar y ocultar la contraseña
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Función para loguearse
    const handleLogIn = (e) => {
        e.preventDefault();
        logIn(usuario);

        if (!usuario) {
            handleSnackbarOpen();
        } else {
            setUser(usuario)
            setInitialAvatar(usuario.username.slice(0,1).toUpperCase());
            handleCloseAccount(e);
        }  
    }

    // Función para desloguearse
    const handleLogOut = (e) => {
        e.preventDefault();
        logOut();
        emptyCart(e);
        handleCloseAccount(e)
        navigate('/');
    }
    
    // Función de enrutamiento para ir a crear una nueva cuenta
    const newAccount = (e) => {
        e.preventDefault()
        navigate('/user/new');
        handleCloseAccount(e)
    }

    // Función de enrutamiento para ir a ver las compras del usuario
    const userPurchases = () => {
        getOrderByUserId(user.id);
        navigate(`/user/${user.id}/purchases`)
    }

    // Función de enrutamiento para ver el perfil del usuario
    const navigateProfile = () => {
        getUserById(user.id);
        navigate(`/user/${user.id}`);
    }


    //  COMPONENT  //
    return (
        <>
            <IconButton
                size="large"
                onClick={!loggedIn ? navigateLogin : handleClickAccount}
                sx={{ ml: 2 }}
                aria-controls={openAccount ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openAccount ? 'true' : undefined}
            >
                {
                    !loggedIn ? (
                        <PersonIcon/>
                    )
                    :(
                        <Avatar sx={{ width: 32, height: 32 }}>
                            <span id='avatar-userWidget'>{initialAvatar}</span>
                        </Avatar>
                    )
                }
            </IconButton>
            
            {
                loggedIn &&
                    <Menu
                        anchorEl={anchorElAccount}
                        id="account-menu"
                        open={openAccount}
                        onClose={handleCloseAccount}
                        onClick={handleCloseAccount}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={userPurchases}>
                            <ListItemIcon>
                                <ShoppingBagIcon fontSize="small" />
                            </ListItemIcon>
                                Mis compras
                        </MenuItem>
                        <MenuItem onClick={navigateProfile}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            Perfil
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={(e) => handleLogOut(e)}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Cerrar sesión
                        </MenuItem>
                    </Menu>
            }
            
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openSnackbar}
                onClick={handleSnackbarClose}
            >
                <Snackbar open={openSnackbar} onClose={handleSnackbarClose} autoHideDuration={6000} id="snackbar-item">
                    <Alert onClose={handleSnackbarClose} severity="error" id="alert-item">
                        Algún dato es incorrecto o te faltó completar el formulario.
                    </Alert>
                </Snackbar>
            </Backdrop>
        </>
    )                            
}

export default UserWidget;