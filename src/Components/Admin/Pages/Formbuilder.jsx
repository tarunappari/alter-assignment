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

  const [editingField, setEditingField] = useState(null);

  return (
    <FormbuilderContainer>
      <div>
        <Navbar title={'form builder'} />
      </div>
      <div className="formbuilder-content-container">
        <div className="left-section">
          <FormDisplay setEditingField={setEditingField} />
        </div>
        <div className="right-section">
          {editingField ? (
            <FieldEditor field={editingField} setEditingField={setEditingField} />
          ) : (
            <>
              <AddFields />
              <AddLogic />
            </>
          )}
        </div>
        <PopupAlert />
      </div>
    </FormbuilderContainer>
  );
};

export default FormBuilder;

let FormbuilderContainer = styled.div`
  min-height: 100vh;
  .formbuilder-content-container{
    display: grid;
  grid-template-columns: 70% 30%;
  min-height: 90vh;
  .left-section,.right-section{
    border: 1px solid red;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .right-section{
    align-self: flex-start;
  }
  }
`