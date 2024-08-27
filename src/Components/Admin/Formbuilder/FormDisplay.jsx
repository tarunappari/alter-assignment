import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styled from 'styled-components';
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const FormDisplay = ({ setEditingField }) => {
    const { formFields, setFormFields, removeField, formName, setFormName } = useContext(GlobalContext);
    const [isEditingName, setIsEditingName] = useState(false);


    const handleBlockClick = (field, value) => {
        const updatedFields = formFields.map(f =>
            f.id === field.id ? { ...f, value: value } : f
        );
        setFormFields(updatedFields);
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'TextArea':
                return (
                    <div className='field-container'>
                        <label>{field.label}</label>
                        <textarea
                            rows="4"
                            value={field.value || ''}
                            onChange={(e) => handleBlockClick(field, e.target.value)}
                        />
                    </div>
                );
            case 'NumericRating':
                return (
                    <div className='field-container'>
                        <label>{field.label}</label>
                        <div style={{ display: 'flex' }}>
                            {[...Array(10).keys()].map(num => (
                                <div
                                    key={num + 1}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0.4rem 0.9rem',
                                        border: '1px solid #ccc',
                                        cursor: 'pointer',
                                        backgroundColor: field.value === num + 1 ? '#575757' : '#f3f3f3',
                                        color: field.value === num + 1 ? '#fff' : '#000'
                                    }}
                                    onClick={() => handleBlockClick(field, num + 1)}
                                >
                                    {num + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'StarRating':
                return (
                    <div className='field-container'>
                        <label>{field.label}</label>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {[...Array(5).keys()].map(num => (
                                <span
                                    key={num + 1}
                                    style={{
                                        fontSize: '29px',
                                        cursor: 'pointer',
                                        fontWeight:'900',
                                        paddingLeft:'0.7rem',
                                        color: field.value >= num + 1 ? '#ffd700' : '#ccc'
                                    }}
                                    onClick={() => handleBlockClick(field, num + 1)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                );
            case 'SmileyRating':
                return (
                    <div className='field-container'>
                        <label>{field.label}</label>
                        <div style={{ display: 'flex', gap: '9px',paddingLeft:'0.7rem' }}>
                            {['😞', '🙁', '😐', '🙂', '😊'].map((smiley, index) => (
                                <span
                                    key={index}
                                    style={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        fontSize: '24px',
                                        cursor: 'pointer',
                                        backgroundColor: field.value === index + 1 ? '#ffeb3b' : '#fff',
                                    }}
                                    onClick={() => handleBlockClick(field, index + 1)}
                                >
                                    {smiley}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            case 'SingleLineInput':
                return (
                    <div className='field-container'>
                        <label>{field.label}</label>
                        <input
                            type="text"
                            value={field.value || ''}
                            style={{
                                backgroundColor:'transparent',
                                borderBottom:'0.1rem solid #494949',
                            }}
                            onChange={(e) => handleBlockClick(field, e.target.value)}
                        />
                    </div>
                );
            case 'Radio':
                return (
                    <div className='field-container'>
                        <label>{field.label}</label>
                        <div style={{display:'flex',flexDirection:'column',gap:'1rem',}}>
                            {field.options.map((option, index) => (
                                <label key={index} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                                    <input
                                        type="radio"
                                        name={field.id}
                                        checked={field.value === option}
                                        onChange={() => handleBlockClick(field, option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case 'Categories':
                return (
                    <div className='field-container'>
                        <label>{field.label}</label>
                        <select
                            value={field.value || ''}
                            style={{padding:'0.5rem',backgroundColor:'transparent',borderRadius:'0.3rem'}}
                            onChange={(e) => handleBlockClick(field, e.target.value)}
                        >
                            {field.options.map((option, index) => (
                                <option style={{padding:'0.5rem'}} key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <FormDisplayContainer>
            <div className='form-display-title'>
                {isEditingName ? (
                    <div className='form-display-title-edit'>
                        <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                        />
                        <button onClick={() => setIsEditingName(false)} >Save</button>
                    </div>
                ) : (
                    <h2>{formName} <button className='form-display-pencil title-pencil' onClick={() => setIsEditingName(true)}><FaPencilAlt /></button></h2>
                )}
            </div>

            <div className="inputfields-container">
                {formFields.length > 0 ? (
                    formFields.map((field) => (
                        <div key={field.id} className='field-mainContainer'>
                            {renderField(field)}
                            <div className='field-edit-del-btns-container'>
                                <button onClick={() => setEditingField(field)}><PencilEdit /></button>
                                <button onClick={() => removeField(field.id)}><DeleteBin /></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className='add-fileds'>Add Fields</h2>
                )}
            </div>
        </FormDisplayContainer>
    );
};

export default FormDisplay;

let FormDisplayContainer = styled.div`
      padding: 2rem;
      border-radius: 0.4rem;
      border:'1px solid red';
      min-width:66%;
      min-height: 70vh;
      margin: 1rem;
      box-shadow: 1px 1px 2px 1px #c4c2c2;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width:70% !important;
      overflow: hidden !important;
      .form-display-title{
            min-width: 116.5%;
            max-height: 3rem;
            padding: 1rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            top: -2rem;
            left: -2rem;
            border-top-right-radius: 0.5rem;
            border-top-left-radius: 0.5rem;
            background-color: #5578f4;
        h2{
          font-size: 1rem;
          color: #fff;
          font-weight: 600;
        }
        .form-display-title-edit{
            input{
                border-bottom: 2px solid #f0efef;
                background-color: transparent;
                color: #f0efef;
            }
            button{
                margin: 0.3rem;
                background-color: transparent;
                color: #d8d5d5;
            }
        }
      }
      .form-display-pencil{
        background-color: transparent;
      }
      .inputfields-container{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: -2rem;
        justify-content: space-between;
        .add-fileds{
            font-weight: 600;
            color: #474747;
        }
        .field-mainContainer{
            display: flex;
            flex-direction: column;
            padding: 0.8rem;
            box-shadow: 1px 1px 2px 1px #c4c2c2;
            border-radius: 0.3rem;
            gap: 0.5rem;
            .field-container{
                display: flex;
                flex-direction: column;
                gap: 0.9rem;
                label{
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #494949;
                }
            }
            .field-edit-del-btns-container{
                    align-self: flex-end;
            }
                
        }
      }
    
`

const DeleteBin = styled(MdDeleteSweep)`
  transform: scale(1.4);
`;

const PencilEdit = styled(FaPencilAlt)`
  transform: scale(1);
`;

