import './post.scss';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthenticationContext } from '../../context/authenticationContext';

const Post = ({ postDetails }) => {

    const [openComment, setOpenComment] = useState(false);
    const [postLikes, setPostLikes] = useState([]);
    const { loggedUser } = useContext(AuthenticationContext);

    const { isLoading, error, data } = useQuery(['likes', postDetails.Id], () =>
        makeRequest.get('/likes?postId=' + postDetails.Id).then(res => {
            setPostLikes(res.data);
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete('/likes?postId=' + postDetails.Id);
            return makeRequest.post('/likes', { postId: postDetails.Id });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['likes']);
            }
        }
    )

    const handleLike = () => {
        mutation.mutate(postLikes.includes(loggedUser.Id))
    }

    return (
        <div className='post'>
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={postDetails.Profile_Pic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${postDetails.UserId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className='name'>{postDetails.Name}</span>
                            </Link>
                            <span className='date'>1 minute ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className="content">
                    <p>{postDetails.Description}</p>
                    <img src={postDetails.Image} alt="" />
                </div>
                <div className="interactions">
                    <div className="item">
                        {isLoading ? 'loading...' : postLikes.includes(loggedUser.Id) ? (
                            <FavoriteOutlinedIcon style={{ color: 'red' }} onClick={handleLike} />
                        ) : (
                            <FavoriteBorderOutlinedIcon onClick={handleLike} />
                        )}
                        {postLikes.length} Likes
                    </div>
                    <div className="item" onClick={() => setOpenComment(!openComment)}>
                        <TextsmsOutlinedIcon />
                        6 Comments
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {/* <Comments postId={postDetails.Id} key={postDetails.Id} /> */}
                {openComment && <Comments postId={postDetails.Id} />}
            </div>
        </div >
    )
}

export default Post
