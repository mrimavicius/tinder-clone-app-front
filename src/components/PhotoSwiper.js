import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation, EffectFade } from 'swiper'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const UserCard = ({ user, swipe, getUserToSwipe, addLikedAndGetNew, small }) => {

  const age =
    user && new Date().getFullYear() - user.dob.slice(0, 4);

  return (
    <div className="swiper-container" style={{ width: small && "250px" }}>
      <Swiper
        modules={[Navigation, EffectFade]}
        navigation
        effect
        speed={800}
        slidesPerView={1}
        loop
        className="myswiper"
        style={{ width: small && "250px" }}
      >
        {user.photos.map((x, i) => (
          <SwiperSlide key={i} className="swiperslide">
            <img src={x} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="card-bottom" style={{ width: small && "250px" }}>
        <div>
          <p>
            {user.name}, {age}
          </p>
          <p>{user.city}</p>
        </div>
        {swipe && (
          <div>
            <button onClick={getUserToSwipe} className="dislike-btn">
              Dislike
            </button>
            <button onClick={addLikedAndGetNew} className="like-btn">
              Like
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard