import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const SignUpPage = () => {

  const nav = useNavigate()
  const [error, setError] = useState()

  const emailRef = useRef()
  const password1Ref = useRef()
  const password2Ref = useRef()
  const nameRef = useRef()
  const cityRef = useRef()
  const dobRef = useRef()
  const genderRef = useRef()
  const photo1Ref = useRef()
  const photo2Ref = useRef()

  async function createUser() {
    setError("");

    const email = emailRef.current.value;
    const password = password1Ref.current.value;
    const password2 = password2Ref.current.value;
    const name = nameRef.current.value;
    const city = cityRef.current.value;
    const dob = dobRef.current.value;
    const gender = genderRef.current.value;
    const photo1 = photo1Ref.current.value;
    const photo2 = photo2Ref.current.value;

    if (!email || !password || !password2 || !name || !city || !dob || !gender || !photo1 || !photo2) return

    const newUser = {
      email,
      password,
      password2,
      name,
      city,
      dob,
      gender,
      photo1,
      photo2
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    const res = await fetch(`http://localhost:4000/create_user`, options);
    const data = await res.json();

    console.log(data);

    if (!data.error) {
      nav("/");
    }

    if (data.error) {
      setError(data.message);
    }
  }

  return (
    <div className="form-container">
      <div className="form signup">
        {error ? <p>{error}</p> : <p>All fields must be filled</p>}

        <input ref={emailRef} type="text" placeholder="Email" />
        <input ref={password1Ref} type="password" placeholder="Password" />
        <input
          ref={password2Ref}
          type="password"
          placeholder="Repeat Password"
        />
        <input ref={nameRef} type="text" placeholder="First Name" />

        <label htmlFor="city">City</label>
        <select ref={cityRef} name="city" id="city">
          <option value="Vilnius">Vilnius</option>
          <option value="Kaunas">Kaunas</option>
          <option value="Klaipėda">Klaipėda</option>
          <option value="Šiauliai">Šiauliai</option>
          <option value="Panevėžys">Panevėžys</option>
        </select>

        <label htmlFor="dob">Date of Birth</label>
        <input id="dob" ref={dobRef} type="date" placeholder="First Name" />

        <label htmlFor="gender">Gender</label>
        <select ref={genderRef} name="gender" id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input ref={photo1Ref} type="text" placeholder="Photo 1 URL" />
        <input ref={photo2Ref} type="text" placeholder="Photo 2 URL" />

        {/* {error.length > 0 && (
          <div className="error">
            <p>{error}</p>
          </div>
        )} */}

        <button onClick={createUser}>Sign up</button>
      </div>
    </div>
  );
}

export default SignUpPage