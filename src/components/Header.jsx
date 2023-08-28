import React from 'react'
import './Header.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Table from './Table';


function Header({planets}) {
  // const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([])
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState("All");
  const [name, setName] = useState("All");
  const [method, setMethod] = useState("All");
  const [facility, setFacility] = useState("All");
  const [disc_year, setDisc_Year] = useState([]);
  const [disc_name, setDisc_Name] = useState([]);
  const [disc_method, setDisc_Method] = useState([]);
  const [disc_facility, setDisc_Facility] = useState([]);



  const handleYear = (e) => {
    setYear(e.target.value);
    //console.log(year)
  }

  const handleName = (e) => {
    setName(e.target.value);
    //console.log(name)
  }
  const handleMethod = (e) => {
    setMethod(e.target.value);
    //console.log(method)
  }

  const handleFacility = (e) => {
    setFacility(e.target.value);
    //console.log(facility)
  }


  function removeDuplicates(arr) {
    arr = arr.flat();
    var unique = [];
    for (let i = 0; i < arr.length; i++) {
      if (unique.indexOf(arr[i]) === -1) {
        unique.push(arr[i]);
      }
    }
    return unique.sort()
    // setDisc_Year(unique.sort())
  }

  // function removeDuplicatesHostName(arr) {
  //   arr = arr.flat();
  //   var unique = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     if (unique.indexOf(arr[i]) === -1) {
  //       unique.push(arr[i]);
  //     }
  //   }
  //   setDisc_Name(unique.sort())
  // }

  // function removeDuplicatesFacility(arr) {
  //   arr = arr.flat();
  //   var unique = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     if (unique.indexOf(arr[i]) === -1) {
  //       unique.push(arr[i]);
  //     }
  //   }
  //   setDisc_Facility(unique.sort())
  // }

  // function removeDuplicatesMethod(arr) {
  //   arr = arr.flat();
  //   var unique = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     if (unique.indexOf(arr[i]) === -1) {
  //       unique.push(arr[i]);
  //     }
  //   }
  //   setDisc_Method(unique.sort())
  // }

  const handleSearch = async () => {
    setLoading(true)
    let temp = planets
    if (year != "All") {
      temp = temp.filter((c) =>{ return c.disc_year === year})
    }
    if (name != "All") {
      temp = temp.filter((c) =>{return c.hostname === name})
    }
    if (method != "All") {
      temp = temp.filter((c) => {return c.discoverymethod === method})
    }
    if (facility != "All") {
      temp = temp.filter((c) => {return c.disc_facility === facility})
    }
    setFilterPlanets(temp)
    console.log(temp);
    setLoading(false)
  }
  console.log("planets",filterPlanets);

  const handleClear = () => {
    setYear("All")
    setMethod("All")
    setName("All")
    setFacility("All")
    handleSearch()
  }
  var newYear;
  var newName;
  var newFacility;
  var newMethod;

  useEffect(() => {
    const temp =  () => {

      let result = planets;

      newYear = result.map((item) => item.disc_year)
      newName = result.map((item) => item.hostname)
      newFacility = result.map((item) => item.disc_facility)
      newMethod = result.map((item) => item.discoverymethod);

      setDisc_Year(removeDuplicates(newYear))
      setDisc_Name(removeDuplicates(newName))
      setDisc_Facility(removeDuplicates(newFacility))
      setDisc_Method(removeDuplicates(newMethod))
    }
    temp();
  }, [])


  return (
    <div className='home'>
      <div className='heading'>
        <img className='logo' src='https://e1.pxfuel.com/desktop-wallpaper/779/781/desktop-wallpaper-nasa-logo-iphone-x-nasa-logo.jpg' alt='logo' />
        Welcome to NASA Exoplanet Query APP
      </div>

      <div className='dropdown'>
        <div className='first'>
          <span>
            Select the discovery year:
          </span>
          <select value={year} onChange={handleYear}>
            <option value={"All"}> Select Year</option>
            {
              disc_year?.map((item) => <option value={item} key={item} >{item}</option>)
            }
          </select>
        </div>

        <div className='second'>
          <span>
            Select the host name:
          </span>
          <select value={name} onChange={handleName}>
            <option value={"All"} > Select hostname</option>
            {
              disc_name?.map((item) => <option value={item} key={item} >{item}</option>)
            }
          </select>
        </div>

        <div className='third'>
          <span>
            Select the discovery method:
          </span>
          <select value={method} onChange={handleMethod}>
            <option value={"All"}> Select method</option>
            {
              disc_method?.map((item) => <option value={item} key={item} >{item}</option>)
            }
          </select>
        </div>

        <div className='fourth'>
          <span>
            Select the discovery facility:
          </span>
          <select value={facility} onChange={handleFacility}>
            <option valu={"All"} > Select facility</option>
            {
              disc_facility?.map((item) => <option value={item} key={item} >{item}</option>)
            }
          </select>
        </div>
      </div>

      <div className='button'>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <div style={{ margin: "40px 30px" }}>
        {loading ? <div style={{ color: "white" }}>Loading...</div> : <Table planets={filterPlanets} />}
      </div>
    </div>

  )
}

export default Header