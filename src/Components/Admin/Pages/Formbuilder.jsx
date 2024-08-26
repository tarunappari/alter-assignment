import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../../Context/GlobalContext';
import FormDisplay from '../Formbuilder/FormDisplay';
import AddFields from '../Formbuilder/AddFields';
import AddLogic from '../Formbuilder/AddLogic';
import PopupAlert from '../Formbuilder/PopupAlert';
import styled from 'styled-components';
import Navbar from '../common/Navbar'
import FieldEditor from '../Formbuilder/FieldEditor';



const FormBuilder = () => {

  const { saveForm, publishForm, published } = useContext(GlobalContext);
  const [editingField, setEditingField] = useState(null);


  return (
    <FormbuilderContainer>
      <div>
        <Navbar title={'form builder'} />
      </div>
      <div className="formbuilder-content-container">
        <div><AddLogic /></div>
        <div className="mid-section">
          <div className='save-publish-btn-container'>
            <button onClick={saveForm} className='save'>SAVE</button>
            {!published && <button onClick={publishForm} className='publish'>PUBLISH</button>}
          </div>
          <FormDisplay setEditingField={setEditingField} />
        </div>
        <div className="right-section">
          {editingField ? (
            <FieldEditor field={editingField} setEditingField={setEditingField} />
          ) : (
            <>
              <AddFields />
            </>
          )}
        </div>
        {/* <PopupAlert /> */}
      </div>
    </FormbuilderContainer>
  );
};

export default FormBuilder;

let FormbuilderContainer = styled.div`
  min-height: 100vh;
  .formbuilder-content-container{
    display: grid;
  grid-template-columns: 20% 60% 20%;
  background-color: #f3f3f3;
  min-height: 90vh;
  .mid-section{
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .save-publish-btn-container{
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: -13rem;
    button{
      padding: 0.7rem 1.3rem;
      color: #fff;
      border-radius: 0.3rem;
      font-weight: 600;
    }
    .save{
      background-color: #2e7d32;
    }
    .publish{
      background-color: #2196f3;
    }
  }
  }
`