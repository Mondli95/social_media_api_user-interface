import './comments.scss';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';

function Comments({ postId }) {

    const [description, setDescription] = useState("");
    const { loggedUser } = useContext(AuthenticationContext);

    const { isLoading, error, data } = useQuery(['comments'], () =>
        makeRequest.get('/comments?postId=' + postId).then(res => {
            postId = null;
            return res.data.recordset;
        })
    );

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (addComment) => {
            return makeRequest.post('/comments', addComment)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"]);
            }
        }
    )

    const handleAddComment = async (e) => {
        e.preventDefault();
        mutation.mutate({ description, postId });
        setDescription("");
    };

    return (
        <div className='comments'>
            <div className="write">
                <img src={loggedUser.profilePic} alt="" />
                <input type="text" placeholder='Write a comment..'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <button onClick={handleAddComment}>Send</button>
            </div>
            {isLoading ? 'loading...' : data.length === 0 ? 'no comments' : data.map((comment) => (
                <div className="comment">
                    <img src={comment.Profile_Pic} alt="" />
                    <div className="info">
                        <span>{comment.Name}</span>
                        <p>{comment.Description}</p>
                    </div>
                    <span className='date'>{moment(comment.Date_Created).fromNow()}</span>
                </div>
            ))}
        </div>
    )
}

export default Comments
