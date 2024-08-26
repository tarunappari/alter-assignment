import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';


const AddLogic = () => {
  const { logicConditions, setLogicConditions, showPopup } = useContext(GlobalContext);
  const [urlCondition, setUrlCondition] = useState(logicConditions.url);
  const [dateCondition, setDateCondition] = useState(logicConditions.date);
  const [timeCondition, setTimeCondition] = useState(logicConditions.time);

  const handleApplyLogic = () => {
    if (!urlCondition && !dateCondition && !timeCondition) {
      showPopup("Please fill in at least one logic condition.");
      return;
    }

    setLogicConditions({ url: urlCondition, date: dateCondition, time: timeCondition });
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
      <button onClick={handleApplyLogic}>Apply Logic</button>
    </div>
  );
};

export default AddLogic;
