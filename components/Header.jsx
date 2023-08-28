import React from "react";
import "./Header.css";
import { useState } from "react";
import { useEffect } from "react";
import Papa from "papaparse";
//import data2 from './data2.csv'

function Header() {
  const [year, setYear] = useState();
  const [name, setName] = useState();
  const [method, setMethod] = useState();
  const [facility, setFacility] = useState();

  const handleYear = (e) => {
    setYear(e.target.value);
    console.log(year);
  };

  const handleName = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const handleMethod = (e) => {
    setMethod(e.target.value);
    console.log(method);
  };

  const handleFacility = (e) => {
    setFacility(e.target.value);
    console.log(facility);
  };

  //  const search =(year, name, method, facility)=>{
  //     if(year || name || method || facility){
  //       console.log("yes")
  //     }
  //  }

  //  useEffect(()=>{
  //   Papa.parse(data2, {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: function (results) {
  //       console.log(results.data)
  //     },
  //   });
  //  },[])

  return (
    <div className="home">
      <div className="heading">
        <img
          className="logo"
          src="https://e1.pxfuel.com/desktop-wallpaper/779/781/desktop-wallpaper-nasa-logo-iphone-x-nasa-logo.jpg"
          alt="logo"
        />
        Welcome to NASA Exoplanet Query APP
      </div>

      <div className="dropdown">
        <div className="first">
          <span>Select the discovery year:</span>
          <select onChange={handleYear}>
            <option>Discovery Year</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>

        <div className="second">
          <span>Select the host name:</span>
          <select onChange={handleName}>
            <option> Host name</option>
            {/* <option>2</option>
            <option>3</option> */}
          </select>
        </div>

        <div className="third">
          <span>Select the discovery method:</span>
          <select onChange={handleMethod}>
            <option>Discovery Method</option>
            {/* <option>2</option>
            <option>3</option> */}
          </select>
        </div>

        <div className="fourth">
          <span>Select the discovery facility:</span>
          <select onChange={handleFacility}>
            <option>Discovery Facility</option>
            {/* <option>2</option>
            <option>3</option> */}
          </select>
        </div>
      </div>
      <div className="button">
        <button>Search</button>
        <button>Clear</button>
      </div>
    </div>
  );
}

export default Header;
