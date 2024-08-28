import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../../Context/GlobalContext';
import FormDisplay from '../Formbuilder/FormDisplay';
import AddFields from '../Formbuilder/AddFields';
import AddLogic from '../Formbuilder/AddLogic';
import styled from 'styled-components';
import Navbar from '../common/Navbar'
import FieldEditor from '../Formbuilder/FieldEditor';
import { useNavigate, useParams } from 'react-router-dom';



const FormBuilder = () => {

  const { formId } = useParams();
  const { setFormFields,setLogicConditions,saveForm, publishForm, published,setFormName } = useContext(GlobalContext);
  const [editingField, setEditingField] = useState(null);

  let navigate = useNavigate()
  

  //this is the func to handle publish click
  const handlePublished = async () => {
    try {
      const published = await publishForm();
      
      if (published) {
        setFormFields([])
        setLogicConditions({ url: '', date: '', time: '' });
        setFormName('Untitled Form')
        navigate('/admin');
      }
    } catch (error) {
      console.error("Error during form publication:", error);
    }
  };
  

  //saving the form
  const handleSave = async() =>{
    try {
      const saved = await saveForm(formId);
  
      if (saved) {
        setFormFields([])
        setLogicConditions({ url: '', date: '', time: '' });
        navigate('/admin');
      }
    } catch (error) {
      console.error("Error during form saving:", error);
    }
  }

  return (
    <FormbuilderContainer>
      <div className='nav-container'>
        <Navbar title={'form builder'} />
      </div>
      <div className="formbuilder-content-container">
        <div><AddLogic /></div>
        <div className="mid-section">
          <div className='save-publish-btn-container'>
            <button onClick={handleSave} className='save'>SAVE</button>
            {!published && <button onClick={handlePublished} className='publish blue'>PUBLISH</button>}
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
  position: relative;
  min-height: 100vh;
  .nav-container{
    position: sticky;
    top: 0;
    z-index: 9;
  }
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
    position: sticky;
    top: 5.4rem;
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
      padding: 0.7rem 1.3rem;
      color: #fff;
      border-radius: 0.3rem;
      font-weight: 600;
    }
  }
  }
`