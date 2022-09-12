//  IMPORTS  //

// CSS
import './ButtonBar.css';

// Material UI
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// React
import { useState } from 'react';

// react-router-dom 
import { useNavigate } from 'react-router-dom';

//  Component  //
const ButtonBar = ({category, categories}) => {

    //  STATES  //

    // Open/Close menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Instancia useNavigate
    const navigate = useNavigate();


    //  FUNCTIONS  //

    // Handle del menú de categorías
    const handleCatClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Enrutamiento de botones
    const navigateToCat = (id) => {
        setAnchorEl(null);
        navigate(`/categories/${id}`);
    };
    const backToProducts = () => {
        navigate(`/products`);
    };


    //  HTML  //
    return (
        <div className='row-buttonBar'>
            <Button id='btn-buttonBar' onClick={backToProducts}><ArrowLeftIcon/> Ver todos</Button>
            <div>
                <Button
                    id="btn-buttonBar"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleCatClick}
                >
                    <ArrowRightIcon/> {category}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'btn-buttonBar',
                    }}
                >
                    {categories.map((c) => {
                        const result = () => {
                            if (category !== c.categoria) {
                                return (
                                    <MenuItem onClick={() => navigateToCat(c.id)} key={c.id} id='btn-buttonBar'>
                                        <ArrowRightIcon/> {c.categoria}
                                    </MenuItem>
                                )
                            }
                        }
                        return result()
                    })}
                </Menu>
            </div>
        </div>
    )
};

export default ButtonBar;