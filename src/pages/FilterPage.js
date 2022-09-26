import { useContext, useState, useRef } from "react";
import mainContext from "../context/mainContext";
import "toolcool-range-slider";

const FilterPage = () => {
  const cityRef = useRef();
  const genderRef = useRef();

  const { onlineUser, setOnlineUser } = useContext(mainContext);

  const [ageMin, setAgeMin] = useState(onlineUser.filter.age_min);
  const [ageMax, setAgeMax] = useState(onlineUser.filter.age_max);

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
    setAgeMin(e.target.value1.toFixed());
    setAgeMax(e.target.value2.toFixed());
  }

  return (
    <div className="profile-container">
      <div className="d-flex flex-col filter">
        <div className="d-flex flex-col">
          <label htmlFor="city">City</label>
          <select ref={cityRef} name="city" id="city">
            <option
              selected={onlineUser.filter.city === "All" ? "selected" : ""}
              value="All"
            >
              All Cities
            </option>
            <option
              selected={onlineUser.filter.city === "Vilnius" ? "selected" : ""}
              value="Vilnius"
            >
              Vilnius
            </option>
            <option
              selected={onlineUser.filter.city === "Kaunas" ? "selected" : ""}
              value="Kaunas"
            >
              Kaunas
            </option>
            <option
              selected={onlineUser.filter.city === "Klaipėda" ? "selected" : ""}
              value="Klaipėda"
            >
              Klaipėda
            </option>
            <option
              selected={onlineUser.filter.city === "Šiauliai" ? "selected" : ""}
              value="Šiauliai"
            >
              Šiauliai
            </option>
            <option
              selected={
                onlineUser.filter.city === "Panevėžys" ? "selected" : ""
              }
              value="Panevėžys"
            >
              Panevėžys
            </option>
          </select>
        </div>

        <div className="d-flex flex-col">
          <label htmlFor="gender">Gender</label>
          <select ref={genderRef} name="gender" id="gender">
            <option
              selected={onlineUser.filter.gender === "male" ? "selected" : ""}
              value="male"
            >
              Male
            </option>
            <option
              selected={onlineUser.filter.gender === "female" ? "selected" : ""}
              value="female"
            >
              Female
            </option>
            <option
              selected={onlineUser.filter.gender === "other" ? "selected" : ""}
              value="other"
            >
              Other
            </option>
          </select>
        </div>

        <div className="d-flex space-btw">
          <p>Age Preference:</p>
          <p>
            {ageMin} - {ageMax}
          </p>
        </div>

        <div className="range-slider">
          <toolcool-range-slider
            onClick={(e) => ageHandler(e)}
            min="18"
            max="99"
            value1={onlineUser.filter.age_min}
            value2={onlineUser.filter.age_max}
            slider-width="100%"
            theme="ruler"
          ></toolcool-range-slider>
        </div>

        <button onClick={saveFilter}>Save Filter</button>
      </div>
    </div>
  );
};

export default FilterPage;
