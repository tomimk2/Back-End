//  IMPORTS  //

// CSS
import './HomeView.css'

// Material UI
import { Button } from '@mui/material';

// Imágenes
import bannerImg from '../../images/home/banner.png';
import sandaliasImg from '../../images/home/sandalias.jpg';
import zapatillasImg from '../../images/home/zapatillas.jpg';

// react-router-dom
import { useNavigate } from 'react-router-dom';


//  Component  //
const HomeView = () => {

    // Instancia useNavigate
    const navigate = useNavigate();

    // Enrutamiento de botones
    const navigateProducts = () => {
        navigate('/products')
    }

    //  HTML  //
    return (
        <div>
            <div className="container-homeView">
                <div className="row-homeView">
                    <img src={bannerImg} alt='Imagen del logo de Mecha calzados con texto' className='banner-homeView' onClick={navigateProducts}/>
                </div>
            </div>
            <div className="container-homeView">
                <div className="row-homeView">
                    <div className="col-homeView">
                        <div className='overflow-homeView'>
                            <img src={sandaliasImg} alt='Sandalias negras' className='img-homeView'/>
                        </div>
                    </div>
                    <div className="col-homeView justifyBottom-homeView">
                        <div className='overflow-homeView align-start'>
                            <h3 className='name-homeView'>Sandalias</h3>
                            <div className='recuadro-homeView'></div>
                        </div>
                        <div className='overflow-homeView align-start'>
                            <p className='description-homeView'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis amet veniam obcaecati similique ipsam earum nulla nostrum eligendi. Eius iusto qui repellendus ipsam illum consequuntur reiciendis hic sit totam dignissimos!
                                Asperiores, modi porro! Sit impedit dolorem vero nesciunt odit asperiores rem quidem voluptatum reiciendis explicabo maxime minus quia, expedita magni vitae, accusantium animi officia cumque eaque eligendi. Placeat, corporis tenetur!
                            </p>
                        </div>
                        <div className='overflow-homeView align-start'>
                            <Button id='btnSandalias-homeView' size='small' onClick={navigateProducts}>Ver más</Button>
                        </div>
                    </div>
                </div>
                <div className="row-homeView">
                    <div className="col-homeView justifyBottom-homeView">
                        <div className='overflow-homeView align-end'>
                            <h3 className='name-homeView'>zapatillas</h3>
                            <div className='w-100 align-end'>
                                <div className='recuadro-homeView'></div>
                            </div>
                        </div>
                        <div className='overflow-homeView align-end'>
                            <p className='description-homeView'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis amet veniam obcaecati similique ipsam earum nulla nostrum eligendi. Eius iusto qui repellendus ipsam illum consequuntur reiciendis hic sit totam dignissimos!
                                Asperiores, modi porro! Sit impedit dolorem vero nesciunt odit asperiores rem quidem voluptatum reiciendis explicabo maxime minus quia, expedita magni vitae, accusantium animi officia cumque eaque eligendi. Placeat, corporis tenetur! 
                            </p>
                        </div>
                        <div className='overflow-homeView align-end'>
                            <Button id='btnSandalias-homeView' size='small' onClick={navigateProducts}>Ver más</Button>
                        </div>
                    </div>
                    <div className="col-homeView">
                        <div className='overflow-homeView'>
                            <img src={zapatillasImg} alt='Zapatillas de varios colores' className='img-homeView imgZapas'/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default HomeView;