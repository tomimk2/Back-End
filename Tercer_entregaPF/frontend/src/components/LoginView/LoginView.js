//  IMPORTS  //

// CSS
import './LoginView.css';

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
import LogInContext from '../../context/LogInContext';
import OrderContext from '../../context/OrderContext';
import CartContext from '../../context/CartContext';

//  COMPONENT   //
const LoginView = () => {

    // Llamada a context
    const {logIn, logOut, loggedIn, setUser, getUserById, setInitialAvatar, initialAvatar} = useContext(LogInContext);
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
    const handleChange = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value
        });
    };

    // Funciones para mostrar y ocultar la contraseña
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Función para loguearse
    const handleLogIn = async (e) => {
        e.preventDefault();
        await logIn(usuario);
        setInitialAvatar(usuario.username.slice(0,1).toUpperCase());
        navigate('/');
    };

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
        const ls = JSON.parse(localStorage.getItem("user"));
        getOrderByUserId(ls.id);
        navigate(`/user/${ls.id}/purchases`)
    }

    // Función de enrutamiento para ver el perfil del usuario
    const navigateProfile = () => {
        const ls = JSON.parse(localStorage.getItem("user"));
        getUserById(ls.id)
        navigate(`/user/${ls.id}`)
    }


    //  HTML   //
    return (
        <div className='container-us'>
            <div className='row-us'>
                <form onSubmit={(e) => handleLogIn(e)}>
                    <MenuItem id='formItem-userWidget'>
                        <TextField
                            label="Usuario"
                            id="formInput-userWidget"
                            sx={{ m: 1, width: '25ch' }}
                            variant="standard"
                            name='username'
                            onChange={handleChange}
                        />
                    </MenuItem>
                    <MenuItem id='formItem-userWidget'>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" id='formInput-userWidget'>
                            <InputLabel htmlFor="standard-adornment-password" id='formLabel-userWidget'>Contraseña</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleChange}
                                name='password'
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </MenuItem>
                    <Button id='btnLogIn-userWidget' type='submit' size='small'>Ingresar</Button>
                </form>
            </div>
            <div className='row-us'>
                <Button id='btnNewAccount-userWidget' type='submit' size='small' onClick={(e) => newAccount(e)}>Crear cuenta</Button>                  
            </div>
        </div>
    )
}

export default LoginView;