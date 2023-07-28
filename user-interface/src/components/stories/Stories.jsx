import './stories.scss';
import { useContext } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';
import { stories } from '../../mockData';

function Stories() {
  const { loggedUser } = useContext(AuthenticationContext);

  return (
    <div className='stories'>
      <div className="story">
        <img src={loggedUser.Profile_Pic} alt='' />
        <span>{loggedUser.Name}</span>
        <button>+</button>
      </div>
      {stories.map(story => (
        <div className="story" key={story.id}>
          <img src={story.img} alt={story.altImg} />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories
