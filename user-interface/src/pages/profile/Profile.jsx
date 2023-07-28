import './profile.scss';
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useId, useState } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';
import Posts from '../../components/posts/Posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const { loggedUser } = useContext(AuthenticationContext);
    const userId = useLocation().pathname.split('/')[2];
    const [user, setUser] = useState({});

    const { isLoading, error, data } = useQuery(['users'], () =>
        makeRequest.get('/users/find/' + userId).then(res => {
            setUser(res.data);
        })
    );

    const handleFollow = () => {


    }

    return (
        <div className='profile'>
            {isLoading ? 'loading..' :
                <>
                    <div className="images">
                        <img src={user.Cover_Pic} alt="" className='cover' />
                        <img src={user.Profile_Pic} alt="" className='profilePic' />
                    </div>
                    <div className="profileContainer">
                        <div className="userDetails">
                            <div className="left">
                                <a href="http://facebook.com">
                                    <FacebookTwoToneIcon fontSize='large' />
                                </a>
                                <a href="http://facebook.com">
                                    <InstagramIcon fontSize='large' />
                                </a>
                                <a href="http://facebook.com">
                                    <PinterestIcon fontSize='large' />
                                </a>
                                <a href="http://facebook.com">
                                    <TwitterIcon fontSize='large' />
                                </a>
                                <a href="http://facebook.com">
                                    <LinkedInIcon fontSize='large' />
                                </a>
                            </div>
                            <div className="center">
                                <span>{loggedUser.name}</span>
                                <div className="info">
                                    <div className="item">
                                        <PlaceIcon />
                                        <span>{user.City}</span>
                                    </div>
                                    <div className="item">
                                        <LanguageIcon />
                                        <span>{user.Website}</span>
                                    </div>
                                </div>
                                {parseInt(userId) === parseInt(loggedUser.Id) ? (
                                    <button>Update</button>
                                ) : (
                                    <button onClick={handleFollow}>follow</button>
                                )}
                            </div>
                            <div className="right">
                                <EmailOutlinedIcon />
                                <MoreVertIcon />
                            </div>
                        </div>
                        <Posts />
                    </div>
                </>}
        </div>
    )
}

export default Profile
