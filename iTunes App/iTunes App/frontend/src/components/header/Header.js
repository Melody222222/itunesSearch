// Import CSS
import './header.css'
import logo from '../../assets/itunes-logo.png';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className='main-row'>
            <div className='logo'>
                <img src={logo} className='full-width' alt='Logo'></img>
            </div>
            <div className='title'>
                <h3>iTunes API App</h3>
            </div>
            <div className='favourites'>
                { <Link to='/favourites'>
                    <Button className='btn btn-danger'>Favourites <i className='fa fa-heart'></i> </Button>
                </Link>} 
            </div>
        </div>
    )
}
export default Header;