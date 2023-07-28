import './posts.scss';
import Post from '../post/Post';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Posts = () => {
  //TODO: WRITE A LOGIC TO ANEBALE USING MOCK DATA OR NOT

  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('/posts').then(res => {
      return res.data.recordset;
    })
  );

  return (
    <div className='posts'>
      {error ? <span style={{ color: 'red' }}>{'Oop! Something went wrong..'}</span> :
        (isLoading ? <span style={{ color: 'green' }}>{'loading...'}</span> : data.map(post => (
          <Post postDetails={post} key={post.Id} />
        )))}
    </div>
  )
}

export default Posts
