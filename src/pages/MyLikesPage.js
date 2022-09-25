import React, { useContext } from 'react'
import UserCard from '../components/PhotoSwiper'
import mainContext from '../context/mainContext'

const MyLikesPage = () => {

    const { onlineUser } = useContext(mainContext)

  return (
    <div className='card-container'>
        {onlineUser.myLikes.length !== 0 ? 
        onlineUser.myLikes.map((x, i) => (
            <div key={i} className='single-card'>
                <UserCard user={x} small={true} />
            </div>
        )) :
        <div className='empty-alert'>You have not liked anyone yet</div>
    }
    </div>
  )
}

export default MyLikesPage