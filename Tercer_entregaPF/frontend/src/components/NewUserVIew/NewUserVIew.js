//  IMPORTS  //

// CSS
import './NewUserVIew.css';

// Material UI
import { TextField, Button } from '@mui/material';

// React
import { useEffect, useState, useContext } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Context
import LogInContext from '../../context/LogInContext';


//  COMPONENT   //
const NewUserVIew = () => {

    // Llamada a contexto
    const {loggedIn, createUser, formSuccess, setFormSuccess} = useContext(LogInContext);

    // Instancia de useNavigate
    const navigate = useNavigate();

    // Estado para crear el formulario
    const [form, setForm] = useState({});


    //  FUNCTIONS   //
    // Función para actualizar el estado del formulario
    const formChange = (e) => {
        // setForm({
        //     ...form,
        //     [e.target.name] : e.target.value,
        // });
        
        // formData.append('avatar', e.target.files);
        
    }

    // Función para enviar el formulario al servidor
    const sendForm = (e) => {
        e.preventDefault();
        let fd = new FormData();
        fd.append("nombre", e.target[0].value);
        fd.append("direccion", e.target[2].value)
        fd.append("telefono", e.target[4].value)
        fd.append("username", e.target[6].value)
        fd.append("password", e.target[8].value)
        fd.append("avatar", e.target[10].files[0])
        createUser(fd)
    }

    // Función de enrutamiento para volver a la sección de productos
    const navigateHome = () => {
        navigate('/products')
    }


    // UseEffect para reestablecer al estado a falso
    useEffect(() => {
        setFormSuccess(false)
    }, [])


    //  HTML  //
    return (
        <>
            {
                !loggedIn ? (
                    <>
                        {
                            !formSuccess ? (
                                <div className='container-newUserView'>
                                    <div className="row-newUserView m-0">
                                        <h3 className="title-newUserView">Creá tu cuenta</h3>
                                    </div>
                                    <div className="row-newUserView m-0">
                                        <div className='recuadro-newUserView'></div>
                                    </div>
                                    <div className="row-newUserView">
                                        <div className="col-newUserView">
                                            <form onSubmit={sendForm} encType="multipart/form-data" id='registerForm'>
                                                <div className="row-newUserView mb-3">
                                                    <TextField label="Nombre" name="nombre" value={form.nombre} required fullWidth onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div className="row-newUserView mb-3">
                                                    <TextField label="Direccion" name="direccion" value={form.direccion} required fullWidth onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div className="row-newUserView mb-3">
                                                    <TextField label="Teléfono" name="telefono" value={form.telefono} required fullWidth onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div className="row-newUserView mb-3">
                                                    <TextField label="Nombre de usuario" name="username" value={form.username} type='email' required fullWidth onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div className="row-newUserView mb-3">
                                                    <TextField label="Contraseña" name="password" value={form.password} type='password' required fullWidth onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div className="row-newUserView mb-3">
                                                    <input type="file" name="avatar" required onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div>
                                                    <Button type='submit' id='btnSend-newUserView'>Enviar</Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div> 
                                </div>
                            )
                            :(
                                <div className="container-newUserView">
                                    <div className="row-newUserView">
                                        <h3 className="title-newUserView">¡Tu usuario se generó correctamente!</h3>
                                    </div>
                                    <div className="row-newUserView">
                                        <p>Te damos la bienvenida <strong>{form.nombre}</strong></p>
                                    </div>  
                                </div>
                            )
                        }
                    </>
                )
                :(
                    <div className="container-newUserView">
                        <div className="row-newUserView">
                            <h3 className="title-newUserView">Ya tenés una cuenta creada</h3>
                        </div>
                        <div className="row-newUserView">
                            <div className="col-newUserView">
                                <Button id='btnSend-newUserView' onClick={navigateHome}>Mirá todos los productos que tenemos para vos</Button>
                            </div>
                        </div>  
                    </div>
                )
            }
            
        </>
    )
}

export default NewUserVIew;