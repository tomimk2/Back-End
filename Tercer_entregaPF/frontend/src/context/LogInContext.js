// Imports de React
import { createContext, useState, useEffect } from "react";

// Imports de database & firestore
import db from '../firebase';
import { collection, getDocs, updateDoc, doc, getDoc, addDoc  } from "firebase/firestore";

// Creación del context
const LogInContext = createContext();


//  CONTEXT   //       
const LogInProvider = ({children}) => {

    // Estados para setear a los usuarios, el estado de logueo y de la creación de un usuario nuevo
    const [usersDb, setUsersDb] = useState([]);
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [initialAvatar, setInitialAvatar] = useState("");
    const [formSuccess, setFormSuccess] = useState();
    const [userImg, setUserImg] = useState();
    const [newUser, setNewUser] = useState();
    const [formId, setFormId] = useState();


    //  FUNCTIONS   //

    // Función para traer todos los usuarios
    const getUsers = async () => {
        const data = await fetch('/')
        // const usersCollection = collection(db, "users");
        // const usersSnapshot = await getDocs(usersCollection);
        // const usersList = usersSnapshot.docs.map(list => {
        //     let usuarios = list.data();
        //     usuarios.id = list.id;
        //     return usuarios
        // })
        // return setUsersDb(usersList)
    }

    // Función para traer un usuario por id
    const getUserById = (id) => {
        fetch(`/user/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
        
        fetch(`/user/${id}/image`, {
            method: 'GET',
            headers: {
              'Content-Type': 'image/jpeg' || 'image/png' || 'image/jpg',
            }
        })
            .then(res => res.blob())
            .then(data => setUserImg(URL.createObjectURL(data), null))
    };    

    // Función para actualizar el perfil de un usuario
    const updateUser = async (data) => {
        // console.log(user)
        // const {id} = ls
        // const userDb = doc(db, 'users', id);
        // const userDoc = await updateDoc(userDb, data)
        // const {user, name, phone, email} = data
        // localStorage.setItem("user", JSON.stringify({id: id, user: user, name: name, phone: phone, email: email}));
        // setUser(ls)
    }

    // Función para iniciar sesión
    const logIn = (userData) => {
        fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => getUserById(data.id))
            .then((res) => setLoggedIn(true))
            .catch((e) => setLoggedIn(false))
    };


    // Función para cerrar sesión
    const logOut = () => {
        fetch('/user/logout')
            .then(res => res.json());
        setLoggedIn(false);
        setUser({});
    };

    // Función para crear un nuevo usuario
    const createUser = (user) => {
        fetch('/register', {
            method: 'POST',
            body: user
        })
            .then(res => res.json())
            .then(data => setNewUser(data));
        setFormSuccess(true)
    }

    // Data para enviar a los children
    const data = {
        logIn,
        logOut,
        user,
        setUser,
        getUsers,
        getUserById,
        userImg,
        loggedIn,
        initialAvatar,
        setInitialAvatar,
        updateUser,
        // checkLogIn,
        createUser,
        formSuccess,
        setFormSuccess
    }

    return (
        <LogInContext.Provider value={data}>
            {children}
        </LogInContext.Provider>
    )
};

export {LogInProvider};
export default LogInContext;