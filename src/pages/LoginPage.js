import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mainContext from "../context/mainContext";

const LoginPage = () => {
  const nav = useNavigate();
  const [error, setError] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();
  const checkRef = useRef();

  const { onlineUser, setOnlineUser } = useContext(mainContext);

  async function login() {
    setError("");

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    };

    const res = await fetch(`http://localhost:4000/log_user`, options);

    const data = await res.json();

    console.log(data);

    if (!data.error) {
      setOnlineUser(data.data);
      nav("/profile");
    }

    if (data.error) {
      setError(data.message);
    }
  }

  function autoLoginTrigger() {
    localStorage.setItem("autologin", checkRef.current.checked);
  }

  useEffect(() => {
    const autologin = localStorage.getItem("autologin");

    if (autologin === "true") {
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      };

      fetch("http://localhost:4000/autologin", options)
        .then((res) => res.json())
        .then((data) => {
          if (data.error === false) {
            console.log("trigger");
            setOnlineUser(data.data);
            nav("/profile");
          }
        });
    }
  }, []);


  return (
    <div className="form-container">
      <div className="form">
        <h2>
          <i className="fa-solid fa-heart"></i> Find Your Love!
        </h2>

        <input ref={emailRef} type="text" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />

        <div className="autologin">
          <input
            onChange={autoLoginTrigger}
            type="checkbox"
            ref={checkRef}
            id="check"
            name="check"
          />
          <label htmlFor="check">stay logged in</label>
          {error && <p>{error}</p>}
        </div>

        <button onClick={login}>Log in</button>
      </div>

      <div className="form form-ext">
        <p>Don't have an account?</p>
        <button onClick={() => nav("/signup")}>Sign up</button>
      </div>
    </div>
  );
};

export default LoginPage;
