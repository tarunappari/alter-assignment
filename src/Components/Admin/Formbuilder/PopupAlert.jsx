import React, { useContext } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';

const PopupAlert = () => {
  const { popupMessage } = useContext(GlobalContext);

  if (!popupMessage) return null;

  return (
    <div style={popupStyle}>
      {popupMessage}
    </div>
  );
};

const popupStyle = {
  position: 'fixed',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#ff0000',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  zIndex: 1000,
};

export default PopupAlert;

