// Import del CSS
import './Pages.css';

// Import de react-router-dom
import { useParams } from "react-router-dom";

// Import del componente
import UserProfileView from '../components/UserProfileView/UserProfileView';


const UserProfile = () => {

    // Creación del id a través del useParams, para pasarlo como prop
    const id = useParams().id_user;

    return(
        <main>
            <UserProfileView id_user={id}/>
        </main>
    )
}

export default UserProfile;