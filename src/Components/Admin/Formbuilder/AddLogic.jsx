import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styled from 'styled-components';


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
    <AddLogicContainer>
      <h3 className='title'>Add Logic</h3>
      <div className="logicfirlds-container">
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
        <div>
          <button onClick={handleApplyLogic}>Apply Logic</button>
        </div>
      </div>
    </AddLogicContainer>
  );
};

export default AddLogic;

let AddLogicContainer = styled.div`
     background-color: #fff;
    min-height: 88vh;
    position: relative;
    top: 0.3rem;
    padding: 3rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #d2d2d2;
    margin-left: 0.2rem;
    .title{
      font-weight: 600;
      padding-bottom: 2rem;
    }
    .logicfirlds-container{
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      min-width: 130%;
      margin-left: -2rem;
      div{
        display: flex;
        flex-direction: column;
        label{
          font-weight: 600;
          font-size: 0.9rem;
        }
        input{
          border: none;
          border-bottom: 1px solid grey;
          padding: 0.5rem;
          font-size: 0.9rem;
        }
        button{
          font-weight:600;
          border-radius: 0.4rem;
        }
      }
    }
`
