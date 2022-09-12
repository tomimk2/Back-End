//  IMPORTS  //

// CSS
import './UserProfileView.css';

// Material UI
import { TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// React
import { useState, useContext, useEffect } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Context
import LogInContext from '../../context/LogInContext';


//  COMPONENT   //
const UserProfileView = ({id_user}) => {

    // Llamada a context
    const {loggedIn, user, updateUser, getUserImage, userImg} = useContext(LogInContext);

    // Instancia useNavigate
    const navigate = useNavigate();

    // Creación de estado del form
    const [form, setForm] = useState({
        nombre: user.nombre, 
        direccion: user.direccion,
        telefono: user.telefono,
        avatar: user.avatar,
        username: user.username
    }); 

    // States para manejar los errores, habilitar los inputs y establecer el correcto envío del formulario
    const [formSuccess, setFormSuccess] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true);
    const [error, setError] = useState(false)


    //  FUNCTIONS   //

    // Función para actualizar el estado de form
    const formChange = (e) => {
        setForm({
            ...form,
            [e.target.nombre] : e.target.value,
        })
    }

    // Función para habilitar el formulario
    const modifyData = () => {
        setIsDisabled(!isDisabled)
    }

    // Función para enviar el formulario
    const sendForm = (e) => {
        e.preventDefault();
        if(e.target.value !== "") {
            updateUser(form)
            setFormSuccess(true);
            // checkLogIn();
        } else {
            setError(true)
        }
    }

    // Función para manejar el error
    const manageError = () => {
        setError(false)
        navigate(`/user/${id_user}`)
    }

    //  HTML   //
    return (
        <>
            {!error ? (
                <>
                    {loggedIn ? (
                        <>
                            {
                                !formSuccess ? (
                                    <div className='container-userProfileView'>
                                        <div className="row-userProfileView m-0">
                                            <h3 className="title-userProfileView">Perfil</h3>
                                        </div>
                                        <div className="row-userProfileView m-0">
                                            <div className='recuadro-userProfileView'></div>
                                        </div>
                                        <div className="row-userProfileView">
                                            <div className="col-userProfileView alignEnd">
                                                <IconButton id='btnEdit-userProfileView' onClick={modifyData}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="row-userProfileView">
                                            <div className="col-userProfileView">
                                                <form onSubmit={sendForm}>
                                                    <div className="row-userProfileView mb-3">
                                                        <img src={userImg} className='img-userProfileView'/>
                                                    </div>
                                                    <div className="row-userProfileView mb-3">
                                                        <input type="file" name="avatar" required onChange={(e) => formChange(e)} id='formInput-userProfileView'/>
                                                    </div>
                                                    <div className="row-userProfileView mb-3">
                                                        <TextField label="Nombre" name="nombre" value={form.nombre} required onChange={(e) => formChange(e)} id='formInput-userProfileView' size='small' variant='standard' fullWidth disabled={isDisabled}/>
                                                    </div>
                                                    <div className="row-userProfileView mb-3">
                                                        <TextField label="Direccion" name="direccion" value={form.direccion} required onChange={(e) => formChange(e)} id='formInput-userProfileView' size='small' variant='standard' fullWidth disabled={isDisabled}/>
                                                    </div>
                                                    <div className="row-userProfileView mb-3">
                                                        <TextField label="Telefono" name="telefono" value={form.telefono} required onChange={(e) => formChange(e)} id='formInput-userProfileView' disabled={isDisabled} size='small' variant='standard' fullWidth/>
                                                    </div>
                                                    <div className="row-userProfileView mb-3">
                                                        <TextField label="Nombre de usuario" name="username" value={form.username} required onChange={(e) => formChange(e)} id='formInput-userProfileView' disabled={isDisabled} size='small' variant='standard' fullWidth/>
                                                    </div>
                                                    <div>
                                                        <Button type='submit' id='btnSend-userProfileView' disabled={isDisabled}>Enviar</Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div> 
                                    </div>
                                )
                                :(
                                    <div className="container-userProfileView">
                                        <div className="row-userProfileView">
                                            <h3 className="title-userProfileView">¡Tu usuario se modificó correctamente!</h3>
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    )
                    :(
                        <div className="container-userProfileView">
                            <div className="row-userProfileView">
                                <h3 className="title-userProfileView">Tenés que ingresar a tu cuenta para poder ver tu perfil</h3>
                            </div>
                        </div>
                    )}
                </>
            ):(
                <div className="container-userProfileView">
                    <div className="row-userProfileView">
                        <h3 className="title-userProfileView">¡Ups! Ocurrió un error.</h3>
                    </div>
                    <div className="row-userProfileView">
                        <div className="col-userProfileView">
                            <Button id='btnSend-userProfileView' onClick={manageError}>Volvé a intentarlo</Button>
                        </div>
                    </div>  
                </div>
            )}
            
        </>
    )
}

export default UserProfileView;