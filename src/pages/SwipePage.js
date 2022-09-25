import React, { useContext, useEffect, useState } from 'react'
import PhotoSwiper from "../components/PhotoSwiper"
import mainContext from '../context/mainContext'

const SwipePage = () => {

    const [userToSwipe, setUserToSwipe] = useState(null)

    const { onlineUser, setOnlineUser } = useContext(mainContext)

    useEffect(() => {
        getUserToSwipe()
    },[])

    async function getUserToSwipe(){
      const info = {
        email: onlineUser.email,
      };

      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(info),
      };

      const res = await fetch(`http://localhost:4000/get_user`, options);

      const data = await res.json();

      console.log(data);

      if (!data.error) {
        setUserToSwipe(data.data);
      }

      if (data.error) {
        // setError(data.message);
      }
    }

    async function addLikedAndGetNew(){

      let alreadyLiked = onlineUser.myLikes.find(
        (x) => x.email === userToSwipe.email
      );

      if(alreadyLiked) return getUserToSwipe()

      const info = {
        email: onlineUser.email,
        myLikes: [...onlineUser.myLikes, userToSwipe],
        otherEmail: userToSwipe.email
      };

      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(info),
      };

      const res = await fetch(`http://localhost:4000/add_like`, options);

      const data = await res.json();

      console.log(data);

      if (!data.error) {
        setOnlineUser(data.data);
        getUserToSwipe()
      }
    }

  return (
    <div className='profile-container'>
        {userToSwipe ?
            <div>
                <PhotoSwiper user={userToSwipe} swipe={true} getUserToSwipe={getUserToSwipe} addLikedAndGetNew={addLikedAndGetNew} />
            </div> :
            <div className='empty-alert'>No users found with this filter</div>
        }
    </div>
  )
}

export default SwipePage