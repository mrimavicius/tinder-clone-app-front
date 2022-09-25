import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainContext from "../context/mainContext";

const Toolbar = () => {
  const { onlineUser, setOnlineUser } = useContext(mainContext);

  const nav = useNavigate()

  async function logoutUser() {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    };
    
    const res = await fetch(`http://localhost:4000/logout`, options);
    const data = await res.json();

    if (!data.error) {
      localStorage.setItem("autologin", "false")
      setOnlineUser(null)
      nav("/")
    }
  }

  return (
    <div className="toolbar">
      <div className="d-flex toolbar-left">
        <Link to={"/profile"}>Profile</Link>
        <Link to={"/filter"}>Filter</Link>
        <Link to={"/swipe"}>Swipe</Link>
        <Link to={"/mylikes"}>
          My Likes ({onlineUser.myLikes.length})
        </Link>
        <Link to={"/gotlikes"}>
          Got Likes ({onlineUser.gotLikes.length})
        </Link>
      </div>
      <div>
        <Link onClick={logoutUser} to={"/"}>
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Toolbar;
