import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styled from 'styled-components';


//this component is responsible for input field editor
const FieldEditor = ({ field, setEditingField }) => {
    const { editField } = useContext(GlobalContext);
    const [label, setLabel] = useState(field.label || '');
    const [required, setRequired] = useState(field.required || false);
    const [errorMessage, setErrorMessage] = useState(field.errorMessage || '');
    const [options, setOptions] = useState(field.options || ['Option 1', 'Option 2', 'Option 3']);

    const handleSave = () => {
        //after clicking save we are editing the that field through the field.id 
        editField(field.id, { label, required, errorMessage, options });
        setEditingField(null);
    };


    const handleOptionChange = (index, newOption) => {
        //handling the option change
        const updatedOptions = [...options];
        updatedOptions[index] = newOption;
        setOptions(updatedOptions);
    };

    return (
        <FieldEditorContainer>
            <h3 className='title'>Edit Field</h3>
            <div className='label-editor'>
                <label>Label:</label>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </div>
            <div className='required-editor'>
                <div className='required'>Required:</div>
                <div>
                    <input type="checkbox" id="toggle" class="checkbox" checked={required}
                    onChange={(e) => setRequired(e.target.checked)} />
                    <label for="toggle" class="switch"></label>
                </div>
            </div>
            {required && (
                <div className='error-msg-editor'>
                    <label>Error Message:</label>
                    <input
                        type="text"
                        value={errorMessage}
                        onChange={(e) => setErrorMessage(e.target.value)}
                        placeholder="Enter error message"
                    />
                </div>
            )}
            {field.type === 'Radio' || field.type === 'Categories' ? (
                <div>
                    <label>Options:</label>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
            <div className='btns-container'>
                <button onClick={handleSave} className='blue'>Save</button>
                <button onClick={() => setEditingField(null)}>Cancel</button>
            </div>
        </FieldEditorContainer>
    );
};

export default FieldEditor;


let FieldEditorContainer = styled.div`
    background-color: #fff;
    min-height: 50vh;
    position: fixed;
    top: 10rem;
    right: 1rem;
    padding: 3rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #d2d2d2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    .title{
      font-weight: 600;
      margin-top: -1rem;
    }
    .label-editor{
        display: flex;
        flex-direction: column;
        label{
            font-weight: 600;
            color: #495262;
            font-size: 0.85rem;
        }
        input{
            border-bottom: 1px solid grey;
            font-size: 0.9rem;
        }
    }
    .required-editor{
        display: flex;
        gap: 1rem;
        align-items: center;
        .required{
            font-weight: 600;
            color: #495262;
            font-size: 0.85rem;
        }
        .switch { 
            position : relative ;
   display : inline-block;
   width : 40px;
   height : 20px;
   background-color: #eee;
   border-radius: 20px;
 }
 .switch::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
  top: 1px; // TO GIVE AN EFFECT OF CIRCLE INSIDE SWITCH.
  left: 1px;
  transition: all 0.3s;
}
.checkbox:checked + .switch::after {
  left : 20px; 
}
.checkbox:checked + .switch {
  background-color: #7983ff;
}
.checkbox { 
   display : none;
}
        
    }
    .error-msg-editor{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        label{
            font-weight: 600;
            color: #495262;
            font-size: 0.85rem;
        }
        input{
            border-bottom: 1px solid grey;
            font-size: 0.8rem;
        }
    }
    .btns-container{
        align-self: flex-end;
        display: flex;
        gap: 0.5rem;
        button{
            font-size: 0.7rem;
            padding: 0.5rem 1.1rem;
        }
    }
`