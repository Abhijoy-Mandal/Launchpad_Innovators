import { PhotoDome } from '@babylonjs/core';
import React, { useEffect, useState } from 'react';
//import '../styles/filter.css';
//import BabylonVisualizer from './BabylonVisualizer';

const FilterButton = ({parentEntityCount}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [asteroid, setAsteroid] = useState(false);
  const [comets, setcomets] = useState(false);
  const [planets, setplanets] = useState(false);
  const [PHO, setPHO] = useState(false);
  const [NEO, setNEO] = useState(false);
  const [hasSatellite, setHasSatellite] = useState(false);
  const [numbered, setNumbered] = useState(false);

  const [entityCount, setEntityCount] = useState(0);
  // const visulaizer = document.getElementById("visualizer");
  // console.log(visulaizer)
  // console.log(asteroid)

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    const getFromAPI = () => {
      var url = "https://ssd-api.jpl.nasa.gov/sbdb_query.api?fields=full_name,epoch,e,a,q,i,om,w&limit=100"
      if (asteroid && !comets){
        url = url + "&sb-kind=a";
      }
      if (!asteroid && comets){
        url = url + "&sb-kind=c";
      }
      if (asteroid && comets){
        setEntityCount(0)
        parentEntityCount(0)
        return
      }
      if (PHO && !NEO){
        url = url + "&sb-group=pha"
      }
      if (!PHO && NEO){
        url = url + "&sb-group=neo"
      }
      if (PHO && NEO){
        setEntityCount(0)
        parentEntityCount(0)
        return
      }
      if (hasSatellite){
        url = url + "&sb-sat=1"
      }
      if (!hasSatellite){
        url = url + "&sb-sat=0"
      }
      console.log(url)
      fetch(url)
        .then(response => response.json())
        .then(data => processResponse(data))

    }

    const processResponse = (data) => {
      setEntityCount(data.count)
      parentEntityCount(data.count)
    }
    getFromAPI();
    return () => {
    };
  }, [asteroid, comets, planets, PHO, NEO, hasSatellite, numbered]);

    const toggleCheckMenu = (val, setVal) => {
      if (val === true){
        //val = false;
        setVal(false);
      }
      else{
        //val = true
        setVal(true);
      }
      //console.log(val)
      // getFromAPI();
    };

    const closeMenu = (e) => {
      // Close menu if clicked outside the box
      if (e.target.className === 'menu-overlay') {
        setShowMenu(false);
      }
  };

  return (
    <>
      {/* Filter button with logo */}
      <button 
        className="filter-button" 
        onClick={toggleMenu}
        style={{position: 'fixed', top: '10px', right: '10px', width: '3vw', height: '5vh', fontFamily:'Arial, sans-serif', fontSize: '24px'}}
      >
        Filter
      </button>

      {/* Menu overlay and box */}
      {showMenu && (
        <div className="menu-overlay" onClick={closeMenu} style={overlayStyle}>
          <div className="menu-box" style={boxStyle}>
            <h3>Filter Options</h3>
            <div>
              <label>
                <input type="checkbox" name="astroids" checked={asteroid} onChange={function(){return toggleCheckMenu(asteroid, setAsteroid)}}/> Astroids
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="comets" checked={comets} onChange={function(){return toggleCheckMenu(comets, setcomets)}}/> Comets
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="planets" checked={planets} onChange={function(){return toggleCheckMenu(planets, setplanets)}}/> Planets
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="PHO" checked={PHO} onChange={function(){return toggleCheckMenu(PHO, setPHO)}}/> PHO
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="NEO" checked={NEO} onChange={function(){return toggleCheckMenu(NEO, setNEO)}}/> NEOs
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="HasSatellite" checked={hasSatellite} onChange={function(){return toggleCheckMenu(hasSatellite, setHasSatellite)}}/> Has satelliteles
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="Numbered" checked={numbered} onChange={function(){return toggleCheckMenu(numbered, setNumbered)}}/> Is numbered
              </label>
            </div>
            <div>
              <text>
                Found {entityCount} entities
              </text>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Basic styles for overlay and box
const overlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const boxStyle = {
  backgroundColor: 'rgba(150, 150, 150, 0.8)',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
};

export default FilterButton;
