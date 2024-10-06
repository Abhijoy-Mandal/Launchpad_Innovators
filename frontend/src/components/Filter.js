import React, { useState } from 'react';
import '../styles/filter.css';

const FilterButton = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
        style={{ position: 'fixed', top: '10px', right: '10px', width: '3vw', height: '5vh', fontFamily:'Arial, sans-serif', fontSize: '24px'}}
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
                <input type="checkbox" name="astroids" /> Astroids
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="comets" /> Comets
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="planets" /> Planets
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="PHO" /> PHO
              </label>
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
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
};

export default FilterButton;
