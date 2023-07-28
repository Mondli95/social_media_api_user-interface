import './navbar.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';

const Navbar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { loggedUser } = useContext(AuthenticationContext);

    return (
        <div className='navbar'>
            <div className="left">
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <span>mondli social</span>
                </Link>
                <HomeOutlinedIcon />
                {darkMode ? <WbSunnyIcon onClick={toggle} /> :
                    <DarkModeOutlinedIcon onClick={toggle} />
                }
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder='Search..' />
                </div>
            </div>
            <div className="right">
                <PersonOutlineOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsNoneOutlinedIcon />
                <div className="user">
                    <img src={loggedUser.Profile_Pic}
                        alt="" />
                    <span>{loggedUser.Name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
