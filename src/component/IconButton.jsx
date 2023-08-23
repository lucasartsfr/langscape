import React, { useState } from 'react';
import { IconContext } from 'react-icons';

const IconButton = ({ icon: Icon, size, color, onClick, children, toggleIcon : ToggleIcon, customClass, toggleValue }) => {

  // const [toggle, setToggle] = useState(false)

  const handleClick = () =>{
    // setToggle(prev => !prev);
    onClick();
  }

  return (
    <button onClick={handleClick} className={`Button Active-${toggleValue} ${customClass && customClass}`}>
      <IconContext.Provider value={{ size, color }}>
        {
          toggleValue ? <ToggleIcon /> : <Icon />
        }
      </IconContext.Provider>
    </button>
  );
};

export default IconButton;