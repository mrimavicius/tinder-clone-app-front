import React, { useContext } from 'react'
import mainContext from '../context/mainContext';
import UserCard from '../components/PhotoSwiper';

const GotLikesPage = () => {

  const { onlineUser } = useContext(mainContext)

  return (
    <div className="card-container">
      {onlineUser.gotLikes.length !== 0 ? (
        onlineUser.gotLikes.map((x, i) => (
          <div key={i} className="single-card">
            <UserCard user={x} small={true} />
          </div>
        ))
      ) : (
        <div className='empty-alert'>Nobody liked you yet</div>
      )}
    </div>
  );
}

export default GotLikesPage