import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';


const AddLogic = () => {
  const [urlCondition, setUrlCondition] = useState('');
  const [dateCondition, setDateCondition] = useState('');
  const [timeCondition, setTimeCondition] = useState('');
  const { showPopup } = useContext(GlobalContext);

  const handleSubmit = () => {
    if (!urlCondition && !dateCondition && !timeCondition) {
      showPopup("Please fill in at least one logic condition.");
      return;
    }
    // Handle form submission with logic conditions
  };

  return (
    <div>
      <h3>Add Logic</h3>
      <div>
        <label>Show based on URL: </label>
        <input type="text" value={urlCondition} onChange={(e) => setUrlCondition(e.target.value)} />
      </div>
      <div>
        <label>Show on a specific date: </label>
        <input type="date" value={dateCondition} onChange={(e) => setDateCondition(e.target.value)} />
      </div>
      <div>
        <label>Show at a specific time: </label>
        <input type="time" value={timeCondition} onChange={(e) => setTimeCondition(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Apply Logic</button>
    </div>
  );
};

export default AddLogic;
