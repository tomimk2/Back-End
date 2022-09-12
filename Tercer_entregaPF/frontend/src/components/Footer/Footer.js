//  IMPORTS  //

// CSS
import './Footer.css';

// Material UI
import { IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Logo tienda
import logoMecha from '../../images/logo.png'


//  Component  //
const Footer = () => {

    //  HTML  //
    return(
        <div className="container-footer">
            <div className="row-footer">
                <div className="col-footer">
                    <div>
                        <img src={logoMecha} alt="Logo Mecha Calzados" className='logo-footer'/>
                    </div>
                    <div>
                        <IconButton href='https://api.whatsapp.com/send?phone=541153882232&app=facebook&entry_point=page_cta&fbclid=IwAR19T2feRHoxnjGggw3exR21foISUDZDTjj0S_hna6sWwJ7ETSOJiTWLouE' target="_blank">
                            <WhatsAppIcon />
                        </IconButton>
                        <IconButton href='https://www.instagram.com/mechacalzados/' target="_blank">
                            <InstagramIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className='divider-footer'></div>
            <div className="row-footer mt-1">
                <div>
                    <p className='copyright-footer'>© Mecha Calzados 2022 - Todos los derechos reservados</p>
                </div>
            </div>
            <div className="row-footer mt-1 mb-4">
                <div>
                    <p className='dev-footer'>Desarrollado por <a href='https://macarena-romero.netlify.app/' id='portfolio-footer' target='_blank' rel="noreferrer">Macarena Romero</a></p>
                </div>
            </div>
        </div>
    )
};

export default Footer;