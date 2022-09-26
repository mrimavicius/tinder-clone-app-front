import React, { useContext, useEffect, useState } from "react";
import PhotoSwiper from "../components/PhotoSwiper";
import mainContext from "../context/mainContext";
import { CSSTransition } from "react-transition-group";

const SwipePage = () => {
  const [userToSwipe, setUserToSwipe] = useState(null);
  const [show, setShow] = useState(false)

  const { onlineUser, setOnlineUser } = useContext(mainContext);

  useEffect(() => {
    getUserToSwipe();
  }, []);

  async function getUserToSwipe() {
    setShow(false)
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
      setShow(true);
    }
  }

  async function addLikedAndGetNew() {
    let alreadyLiked = onlineUser.myLikes.find(
      (x) => x.email === userToSwipe.email
    );

    if (alreadyLiked) return getUserToSwipe();

    const info = {
      email: onlineUser.email,
      myLikes: [...onlineUser.myLikes, userToSwipe],
      otherEmail: userToSwipe.email,
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
      getUserToSwipe();
    }
  }

  return (
    <div className="profile-container">
      {userToSwipe ? (
        <div>
          <CSSTransition
          in={show}
          timeout={300}
          classNames="my-element"
          unmountOnExit
          >
            <PhotoSwiper
              user={userToSwipe}
              swipe={true}
              getUserToSwipe={getUserToSwipe}
              addLikedAndGetNew={addLikedAndGetNew}
            />
          </CSSTransition>
        </div>
      ) : (
        <div className="empty-alert">No users found with this filter</div>
      )}
    </div>
  );
};

export default SwipePage;
