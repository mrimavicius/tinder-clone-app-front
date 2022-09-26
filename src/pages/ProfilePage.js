import { useContext, useRef } from 'react'
import mainContext from '../context/mainContext'
import UserCard from '../components/PhotoSwiper'

const ProfilePage = () => {

    const { onlineUser, setOnlineUser } = useContext(mainContext)

    const photoRef = useRef()

    async function addPhoto() {
      const user = {
        email: onlineUser.email,
        photos: [...onlineUser.photos, photoRef.current.value],
      };

      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const res = await fetch(`http://localhost:4000/add_photo`, options);

      const data = await res.json();

      console.log(data);

      setOnlineUser(data.data)
    }

  return (
    <div className='profile-container'>
        <UserCard user={onlineUser}/>
        <div className='d-flex space-btw input-box'>
            <input ref={photoRef} type="text" placeholder='photo URL' />
            <button onClick={addPhoto}>Add Photo</button>
        </div>
    </div>
  )
}

export default ProfilePage