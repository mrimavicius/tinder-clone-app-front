import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import mainContext from '../context/mainContext';
import "toolcool-range-slider"


const FilterPage = () => {

  const cityRef = useRef()
  const genderRef = useRef()

  const { onlineUser, setOnlineUser } = useContext(mainContext)

  const [ageMin, setAgeMin] = useState(18)
  const [ageMax, setAgeMax] = useState(35)

  async function saveFilter() {
    const info = {
      email: onlineUser.email,
      filter: {
        city: cityRef.current.value,
        gender: genderRef.current.value,
        age_min: ageMin,
        age_max: ageMax,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    };

    const res = await fetch(`http://localhost:4000/filter`, options);

    const data = await res.json();

    console.log(data);

    if (!data.error) {
      setOnlineUser(data.data);
    }
  }

  function ageHandler(e) {
    setAgeMin(e.target.value1.toFixed())
    setAgeMax(e.target.value2.toFixed())
  }

  return (
    <div className="profile-container">
      <div className='d-flex flex-col filter'>
        <div className="d-flex flex-col">
          <label htmlFor="city">City</label>
          <select ref={cityRef} name="city" id="city">
            <option value="All">All Cities</option>
            <option value="Vilnius">Vilnius</option>
            <option value="Kaunas">Kaunas</option>
            <option value="Klaipėda">Klaipėda</option>
            <option value="Šiauliai">Šiauliai</option>
            <option value="Panevėžys">Panevėžys</option>
          </select>
        </div>
        
        <div className="d-flex flex-col">
          <label htmlFor="gender">Gender</label>
          <select ref={genderRef} name="gender" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className='d-flex space-btw'>
          <p>Age Preference:</p>
            <p>{ageMin} - {ageMax}</p>
        </div>

        <div className='range-slider'>
          <toolcool-range-slider
            onClick={(e) => ageHandler(e)}
            min="18"
            max="99"
            value1="18"
            value2="35"
            slider-width="100%"
            theme="rect"
          ></toolcool-range-slider>
        </div>

        <button onClick={saveFilter}>Save Filter</button>
      </div>
    </div>
  );
}

export default FilterPage