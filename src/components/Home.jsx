import React from "react";
import "./Home.css";
import { useState } from "react";
import { useEffect } from "react";
import Table from "./Table";

function Home() {
  //Setting and Intializing states to their default value.
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("All");
  const [name, setName] = useState("All");
  const [method, setMethod] = useState("All");
  const [facility, setFacility] = useState("All");
  const [disc_year, setDisc_Year] = useState([]);
  const [disc_name, setDisc_Name] = useState([]);
  const [disc_method, setDisc_Method] = useState([]);
  const [disc_facility, setDisc_Facility] = useState([]);

  //Handling input after selecting from the select field.

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleMethod = (e) => {
    setMethod(e.target.value);
  };

  const handleFacility = (e) => {
    setFacility(e.target.value);
  };

  //  Function for removing duplicates and sorting the array
  function removeDuplicates(arr) {
    arr = arr.flat();
    var unique = [];
    for (let i = 0; i < arr.length; i++) {
      if (unique.indexOf(arr[i]) === -1) {
        unique.push(arr[i]);
      }
    }
    return unique.sort();
  }

  const handleSearch = async () => {
    setLoading(true);
    let temp = planets;
    if (year != "All") {
      temp = temp.filter((c) => {
        return c.disc_year === year;
      });
    }
    if (name != "All") {
      temp = temp.filter((c) => {
        return c.hostname === name;
      });
    }
    if (method != "All") {
      temp = temp.filter((c) => {
        return c.discoverymethod === method;
      });
    }
    if (facility != "All") {
      temp = temp.filter((c) => {
        return c.disc_facility === facility;
      });
    }
    setFilterPlanets(temp);
    console.log(temp);
    setLoading(false);
  };

  // console.log("planets",filterPlanets);

  const handleClear = () => {
    setYear("All");
    setMethod("All");
    setName("All");
    setFacility("All");
    setFilterPlanets([]);
  };

  var newYear;
  var newName;
  var newFacility;
  var newMethod;
  useEffect(() => {
    const temp = async () => {
      const csv = await fetch(
        "https://raw.githubusercontent.com/udit0012/exoplanetBackend/main/data4.csv"
      );
      const data = await csv.text();
      let array = data.toString();
      const [keys, ...rest] = array
        .trim()
        .split("\n")
        .map((item) => item.split(","));
      let formedArr = rest.map((item) => {
        const object = {};
        keys.forEach((key, index) => (object[key] = item.at(index)));
        return object;
      });
      //  console.log(result)
      setPlanets(formedArr);

      newYear = formedArr.map((item) => item.disc_year);
      newName = formedArr.map((item) => item.hostname);
      newFacility = formedArr.map((item) => item.disc_facility);
      newMethod = formedArr.map((item) => item.discoverymethod);

      setDisc_Year(removeDuplicates(newYear));
      setDisc_Name(removeDuplicates(newName));
      setDisc_Facility(removeDuplicates(newFacility));
      setDisc_Method(removeDuplicates(newMethod));
    };

    temp();
  }, []);

  return (
    <div className="bg-animation">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="stars4"></div>

      <div className="heading">
        <img
          className="logo"
          src="https://e1.pxfuel.com/desktop-wallpaper/779/781/desktop-wallpaper-nasa-logo-iphone-x-nasa-logo.jpg"
          alt="logo"
        />
        Welcome to NASA Exoplanet Query APP
      </div>

      <div className="dropdown">
        <div>
          <span>Select the discovery year:</span>
          <select value={year} onChange={handleYear}>
            <option value={"All"}> Select Year</option>
            {disc_year?.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span>Select the host name:</span>
          <select value={name} onChange={handleName}>
            <option value={"All"}> Select hostname</option>
            {disc_name?.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span>Select the discovery method:</span>
          <select value={method} onChange={handleMethod}>
            <option value={"All"}> Select method</option>
            {disc_method?.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span>Select the discovery facility:</span>
          <select value={facility} onChange={handleFacility}>
            <option valu={"All"}> Select facility</option>
            {disc_facility?.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="button">
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      <div style={{ margin: "40px 30px" }}>
        {loading ? (
          <div style={{ color: "white" }}>Loading...</div>
        ) : (
          <Table planets={filterPlanets} />
        )}
      </div>
    </div>
  );
}

export default Home;
